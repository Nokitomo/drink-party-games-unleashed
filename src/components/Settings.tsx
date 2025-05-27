
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { AudioVibrationsSettings } from "@/components/settings/AudioVibrationsSettings";
import { DisplaySettings } from "@/components/settings/DisplaySettings";
import { GameSettings } from "@/components/settings/GameSettings";
import { SafetySettings } from "@/components/settings/SafetySettings";
import { useSettings } from "@/contexts/SettingsContext";

export const Settings = () => {
  const {
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
  } = useSettings();

  const handleVolumeTest = () => {
    playSound('success');
  };

  const handleVibrationTest = () => {
    triggerVibration([100, 50, 100]);
  };

  return (
    <div className="space-y-6 pb-8">
      <SettingsHeader 
        title="Impostazioni"
        description="Personalizza la tua esperienza di gioco"
      />

      <AudioVibrationsSettings
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        vibrationEnabled={vibrationEnabled}
        setVibrationEnabled={setVibrationEnabled}
        volume={volume}
        setVolume={setVolume}
        onVolumeTest={handleVolumeTest}
        onVibrationTest={handleVibrationTest}
      />

      <DisplaySettings
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        brightness={brightness}
        setBrightness={setBrightness}
      />

      <GameSettings
        powerHourDuration={powerHourDuration}
        setPowerHourDuration={setPowerHourDuration}
      />

      <SafetySettings
        safetyReminder={safetyReminder}
        setSafetyReminder={setSafetyReminder}
        maxDrinks={maxDrinks}
        setMaxDrinks={setMaxDrinks}
      />
    </div>
  );
};
