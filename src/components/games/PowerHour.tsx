
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PowerHour = () => {
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sipsCount, setSipsCount] = useState(0);
  const [totalSips, setTotalSips] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsRunning(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  // Trigger drink reminder every minute
  useEffect(() => {
    if (isRunning && timeRemaining % 60 === 0 && timeRemaining !== 3600) {
      // Simulate vibration/notification
      console.log("DRINK TIME! 🍺");
    }
  }, [timeRemaining, isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startGame = () => {
    setIsRunning(true);
  };

  const pauseGame = () => {
    setIsRunning(false);
  };

  const resetGame = () => {
    setIsRunning(false);
    setTimeRemaining(3600);
    setSipsCount(0);
    setTotalSips(0);
  };

  const addSip = () => {
    setSipsCount(sipsCount + 1);
    setTotalSips(totalSips + 1);
  };

  const progress = ((3600 - timeRemaining) / 3600) * 100;
  const currentMinute = Math.floor((3600 - timeRemaining) / 60) + 1;

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs defaultValue="play" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/30">
          <TabsTrigger value="rules" className="text-white data-[state=active]:bg-orange-600">
            Regole
          </TabsTrigger>
          <TabsTrigger value="play" className="text-white data-[state=active]:bg-orange-600">
            Gioca
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card className="bg-black/30 border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Come si gioca</h2>
            <div className="space-y-3 text-white/90">
              <p>• Il gioco dura esattamente 1 ora (60 minuti)</p>
              <p>• Ogni minuto TUTTI devono bere un sorso</p>
              <p>• Il timer vi avviserà quando bere</p>
              <p>• Usate il pulsante "BEVI" per registrare ogni sorso</p>
              <p>• Obiettivo: completare tutti i 60 sorsi!</p>
            </div>
          </Card>
          
          <Card className="bg-orange-900/30 border-orange-500/30 p-4">
            <h3 className="text-lg font-bold text-orange-200 mb-2">🎯 Obiettivi</h3>
            <div className="space-y-2 text-orange-200 text-sm">
              <p>• <strong>Principiante:</strong> 30 sorsi (30 minuti)</p>
              <p>• <strong>Intermedio:</strong> 45 sorsi (45 minuti)</p>
              <p>• <strong>Esperto:</strong> 60 sorsi (1 ora completa)</p>
            </div>
          </Card>
          
          <Card className="bg-red-900/30 border-red-500/30 p-4">
            <p className="text-red-200 text-sm text-center">
              ⚠️ Fate pause se necessario. La vostra sicurezza è più importante del gioco!
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="play" className="space-y-6">
          {/* Timer Display */}
          <Card className="bg-gradient-to-r from-orange-600 to-red-500 p-8 text-center">
            <div className="text-white">
              <h2 className="text-lg mb-2">Tempo Rimanente</h2>
              <div className="text-6xl font-bold mb-4">
                {formatTime(timeRemaining)}
              </div>
              
              {/* Progress Ring */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="white"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
              
              <div className="text-orange-100">
                Minuto {currentMinute} di 60
              </div>
            </div>
          </Card>

          {/* Drink Button */}
          <div className="text-center">
            <Button 
              onClick={addSip}
              className="bg-orange-600 hover:bg-orange-700 text-white text-2xl font-bold py-8 px-12 rounded-full haptic-feedback transform transition-all duration-200 hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-2">🍺</div>
                <div>BEVI!</div>
              </div>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-black/30 border-white/20 p-4 text-center">
              <div className="text-2xl font-bold text-orange-300">{sipsCount}</div>
              <div className="text-white/70 text-sm">Sorsi questo minuto</div>
            </Card>
            <Card className="bg-black/30 border-white/20 p-4 text-center">
              <div className="text-2xl font-bold text-orange-300">{totalSips}</div>
              <div className="text-white/70 text-sm">Sorsi totali</div>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            {!isRunning ? (
              <Button 
                onClick={startGame}
                disabled={timeRemaining === 0}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                {timeRemaining === 3600 ? 'Inizia Power Hour' : 'Riprendi'}
              </Button>
            ) : (
              <Button 
                onClick={pauseGame}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 text-lg"
              >
                Pausa
              </Button>
            )}
            
            <Button 
              onClick={resetGame}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
            >
              Reset
            </Button>
          </div>

          {/* Minute Reminder */}
          {timeRemaining % 60 === 0 && isRunning && timeRemaining !== 3600 && (
            <Card className="bg-red-900/50 border-red-500/50 p-4 animate-bounce">
              <div className="text-center text-red-200">
                <div className="text-2xl mb-2">🚨 TEMPO DI BERE! 🚨</div>
                <p>Tutti bevono un sorso adesso!</p>
              </div>
            </Card>
          )}

          {/* Game Complete */}
          {timeRemaining === 0 && (
            <Card className="bg-green-900/50 border-green-500/50 p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-200 mb-2">🏆 COMPLETATO!</h3>
                <p className="text-green-300">Avete completato la Power Hour!</p>
                <p className="text-green-300">Sorsi totali: {totalSips}</p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
