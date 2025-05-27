
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, VolumeX, Vibrate, VibrateOff, Sun, Moon, Timer } from "lucide-react";
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
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Impostazioni</h2>
        <p className="text-white/70">Personalizza la tua esperienza di gioco</p>
      </div>

      {/* Audio & Vibrazione */}
      <Card className="bg-black/30 border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Audio & Vibrazione
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sound" className="text-white/90 flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              Suoni di gioco
            </Label>
            <Switch 
              id="sound"
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
          </div>

          {soundEnabled && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-white/80 text-sm">Volume</Label>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleVolumeTest}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Test
                </Button>
              </div>
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-white/60 text-right">{volume}%</div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="vibration" className="text-white/90 flex items-center gap-2">
              {vibrationEnabled ? <Vibrate className="w-4 h-4" /> : <VibrateOff className="w-4 h-4" />}
              Vibrazione
            </Label>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleVibrationTest}
                disabled={!vibrationEnabled}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
              >
                Test
              </Button>
              <Switch 
                id="vibration"
                checked={vibrationEnabled}
                onCheckedChange={setVibrationEnabled}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Visualizzazione */}
      <Card className="bg-black/30 border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Sun className="w-5 h-5" />
          Visualizzazione
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode" className="text-white/90 flex items-center gap-2">
              {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              Tema scuro
            </Label>
            <Switch 
              id="darkMode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white/80 text-sm">Luminosità schermo</Label>
            <Slider
              value={[brightness]}
              onValueChange={(value) => setBrightness(value[0])}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="text-xs text-white/60 text-right">{brightness}%</div>
          </div>
        </div>
      </Card>

      {/* Impostazioni di Gioco */}
      <Card className="bg-black/30 border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Timer className="w-5 h-5" />
          Impostazioni di Gioco
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white/80 text-sm">Durata Power Hour</Label>
            <Select value={powerHourDuration} onValueChange={setPowerHourDuration}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="30" className="text-white hover:bg-white/10">30 minuti</SelectItem>
                <SelectItem value="45" className="text-white hover:bg-white/10">45 minuti</SelectItem>
                <SelectItem value="60" className="text-white hover:bg-white/10">60 minuti</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Sicurezza */}
      <Card className="bg-black/30 border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">⚠️ Sicurezza</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="safety" className="text-white/90">
              Promemoria "Bevi responsabilmente"
            </Label>
            <Switch 
              id="safety"
              checked={safetyReminder}
              onCheckedChange={setSafetyReminder}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white/80 text-sm">Limite massimo sorsi per sessione</Label>
            <Slider
              value={[maxDrinks]}
              onValueChange={(value) => setMaxDrinks(value[0])}
              min={5}
              max={20}
              step={1}
              className="w-full"
            />
            <div className="text-xs text-white/60 text-right">{maxDrinks} sorsi</div>
          </div>

          <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3 mt-4">
            <p className="text-orange-200 text-sm">
              💡 Ricorda sempre di bere responsabilmente e di non guidare dopo aver bevuto!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
