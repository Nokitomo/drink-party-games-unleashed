
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Sun, Moon } from "lucide-react";

interface DisplaySettingsProps {
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
  brightness: number;
  setBrightness: (brightness: number) => void;
}

export const DisplaySettings = ({
  darkMode,
  setDarkMode,
  brightness,
  setBrightness
}: DisplaySettingsProps) => {
  return (
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
  );
};
