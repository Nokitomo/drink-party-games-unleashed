
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Vibrate, VibrateOff } from "lucide-react";

interface AudioVibrationsSettingsProps {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  vibrationEnabled: boolean;
  setVibrationEnabled: (enabled: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  onVolumeTest: () => void;
  onVibrationTest: () => void;
}

export const AudioVibrationsSettings = ({
  soundEnabled,
  setSoundEnabled,
  vibrationEnabled,
  setVibrationEnabled,
  volume,
  setVolume,
  onVolumeTest,
  onVibrationTest
}: AudioVibrationsSettingsProps) => {
  return (
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
                onClick={onVolumeTest}
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
              onClick={onVibrationTest}
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
  );
};
