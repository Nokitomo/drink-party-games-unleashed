
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Timer } from "lucide-react";

interface GameSettingsProps {
  powerHourDuration: string;
  setPowerHourDuration: (duration: string) => void;
}

export const GameSettings = ({
  powerHourDuration,
  setPowerHourDuration
}: GameSettingsProps) => {
  return (
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
  );
};
