
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  vibrationEnabled: boolean;
  setVibrationEnabled: (enabled: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  brightness: number;
  setBrightness: (brightness: number) => void;
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
  powerHourDuration: string;
  setPowerHourDuration: (duration: string) => void;
  safetyReminder: boolean;
  setSafetyReminder: (enabled: boolean) => void;
  maxDrinks: number;
  setMaxDrinks: (max: number) => void;
  playSound: (soundType: 'click' | 'success' | 'warning') => void;
  triggerVibration: (pattern?: number | number[]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [volume, setVolume] = useState(70);
  const [brightness, setBrightness] = useState(80);
  const [darkMode, setDarkMode] = useState(true);
  const [powerHourDuration, setPowerHourDuration] = useState("60");
  const [safetyReminder, setSafetyReminder] = useState(true);
  const [maxDrinks, setMaxDrinks] = useState(10);

  // Applica la luminosità dello schermo
  useEffect(() => {
    const brightnessValue = brightness / 100;
    document.documentElement.style.filter = `brightness(${brightnessValue})`;
  }, [brightness]);

  // Applica il tema scuro/chiaro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Debug vibration support on component mount
  useEffect(() => {
    console.log('Vibration API support:', 'vibrate' in navigator);
    console.log('Navigator vibrate function:', navigator.vibrate);
    console.log('User agent:', navigator.userAgent);
  }, []);

  // Funzione per riprodurre suoni
  const playSound = (soundType: 'click' | 'success' | 'warning') => {
    if (!soundEnabled) {
      console.log('Sound disabled, skipping sound:', soundType);
      return;
    }

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Imposta il volume basato sulle impostazioni
      gainNode.gain.setValueAtTime(volume / 100 * 0.1, audioContext.currentTime);

      // Frequenze diverse per tipi di suono diversi
      const frequencies = {
        click: 800,
        success: 1000,
        warning: 400
      };

      oscillator.frequency.setValueAtTime(frequencies[soundType], audioContext.currentTime);
      oscillator.type = 'sine';

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);

      // Cleanup
      oscillator.onended = () => {
        audioContext.close();
      };

      console.log('Sound played:', soundType, 'at volume:', volume);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Funzione per attivare la vibrazione
  const triggerVibration = (pattern: number | number[] = 200) => {
    console.log('Vibration triggered with pattern:', pattern);
    console.log('Vibration enabled:', vibrationEnabled);
    console.log('Navigator vibrate available:', 'vibrate' in navigator);
    
    if (!vibrationEnabled) {
      console.log('Vibration disabled in settings');
      return;
    }

    if (!('vibrate' in navigator)) {
      console.log('Vibration API not supported');
      return;
    }

    try {
      const result = navigator.vibrate(pattern);
      console.log('Vibration result:', result);
      
      // Fallback per dispositivi che non supportano navigator.vibrate
      if (!result) {
        console.log('Vibration failed, trying alternative method');
        // Prova con un pattern diverso
        navigator.vibrate([100]);
      }
    } catch (error) {
      console.error('Error triggering vibration:', error);
    }
  };

  const value = {
    soundEnabled,
    setSoundEnabled,
    vibrationEnabled,
    setVibrationEnabled,
    volume,
    setVolume,
    brightness,
    setBrightness,
    darkMode,
    setDarkMode,
    powerHourDuration,
    setPowerHourDuration,
    safetyReminder,
    setSafetyReminder,
    maxDrinks,
    setMaxDrinks,
    playSound,
    triggerVibration
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
