
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface SafetySettingsProps {
  safetyReminder: boolean;
  setSafetyReminder: (enabled: boolean) => void;
  maxDrinks: number;
  setMaxDrinks: (max: number) => void;
}

export const SafetySettings = ({
  safetyReminder,
  setSafetyReminder,
  maxDrinks,
  setMaxDrinks
}: SafetySettingsProps) => {
  return (
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
  );
};
