
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statements = [
  "Io non ho mai... mentito sull'età",
  "Io non ho mai... cantato sotto la doccia",
  "Io non ho mai... dimenticato il nome di qualcuno appena presentato",
  "Io non ho mai... guardato un film per bambini da adulto",
  "Io non ho mai... fatto finta di essere malato per non andare al lavoro",
  "Io non ho mai... ballato da solo in camera",
  "Io non ho mai... mangiato qualcosa caduto per terra",
  "Io non ho mai... spiato sui social dell'ex",
  "Io non ho mai... fatto un sogno imbarazzante su qualcuno che conosco",
  "Io non ho mai... usato il telefono in bagno",
  "Io non ho mai... fatto finta di sapere di cosa si stava parlando",
  "Io non ho mai... guardato una serie TV per un'intera notte",
  "Io non ho mai... comprato qualcosa solo perché era in saldo",
  "Io non ho mai... fatto una foto al cibo prima di mangiarlo",
  "Io non ho mai... dormito con un peluche da adulto",
  "Io non ho mai... pianto guardando un film",
  "Io non ho mai... fatto shopping online alle 3 di notte",
  "Io non ho mai... mangiato gelato direttamente dal contenitore",
  "Io non ho mai... fatto finta di non vedere qualcuno per strada",
  "Io non ho mai... cercato il mio nome su Google"
];

export const IoNonHoMai = () => {
  const [currentStatement, setCurrentStatement] = useState(0);
  const [playerScores, setPlayerScores] = useState<{[key: string]: number}>({});
  const [currentPlayer, setCurrentPlayer] = useState("Giocatore 1");
  const [gameStarted, setGameStarted] = useState(false);

  const nextStatement = () => {
    if (currentStatement < statements.length - 1) {
      setCurrentStatement(currentStatement + 1);
    } else {
      setCurrentStatement(0);
    }
  };

  const handleAnswer = (hasDone: boolean) => {
    if (hasDone) {
      setPlayerScores({
        ...playerScores,
        [currentPlayer]: (playerScores[currentPlayer] || 0) + 1
      });
    }
    
    setTimeout(() => {
      nextStatement();
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs defaultValue="play" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/30">
          <TabsTrigger value="rules" className="text-white data-[state=active]:bg-blue-600">
            Regole
          </TabsTrigger>
          <TabsTrigger value="play" className="text-white data-[state=active]:bg-blue-600">
            Gioca
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card className="bg-black/30 border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Come si gioca</h2>
            <div className="space-y-3 text-white/90">
              <p>• I giocatori si siedono in cerchio</p>
              <p>• Leggete ad alta voce l'affermazione che appare</p>
              <p>• Chi ha fatto quella cosa deve bere</p>
              <p>• Passate il telefono al giocatore successivo</p>
              <p>• Continuate fino a quando non vi divertite più!</p>
            </div>
          </Card>
          
          <Card className="bg-blue-900/30 border-blue-500/30 p-4">
            <h3 className="text-lg font-bold text-blue-200 mb-2">💡 Suggerimenti</h3>
            <div className="space-y-2 text-blue-200 text-sm">
              <p>• Siate onesti per rendere il gioco più divertente</p>
              <p>• Potete raccontare la storia dietro l'affermazione</p>
              <p>• Chi mente deve bere una penale!</p>
            </div>
          </Card>
          
          <Card className="bg-red-900/30 border-red-500/30 p-4">
            <p className="text-red-200 text-sm text-center">
              ⚠️ Rispettate i limiti di tutti e bevete responsabilmente
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="play" className="space-y-6">
          {/* Current Statement */}
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-center">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-6">
                {statements[currentStatement]}
              </h2>
              <div className="text-blue-100 text-sm">
                Affermazione {currentStatement + 1} di {statements.length}
              </div>
            </div>
          </Card>

          {/* Answer Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => handleAnswer(true)}
              className="bg-red-600 hover:bg-red-700 text-white py-8 text-xl haptic-feedback"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🍺</div>
                <div>L'ho fatto</div>
                <div className="text-sm opacity-80">(Bevi!)</div>
              </div>
            </Button>
            
            <Button 
              onClick={() => handleAnswer(false)}
              className="bg-green-600 hover:bg-green-700 text-white py-8 text-xl haptic-feedback"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">😇</div>
                <div>Non l'ho fatto</div>
                <div className="text-sm opacity-80">(Salvo!)</div>
              </div>
            </Button>
          </div>

          {/* Player Score */}
          {Object.keys(playerScores).length > 0 && (
            <Card className="bg-black/30 border-white/20 p-4">
              <h3 className="text-white font-bold mb-2 text-center">Conteggio Sorsi</h3>
              <div className="space-y-2">
                {Object.entries(playerScores).map(([player, score]) => (
                  <div key={player} className="flex justify-between text-white">
                    <span>{player}</span>
                    <span className="font-bold text-blue-300">{score} sorsi</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={nextStatement}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
            >
              Prossima Affermazione
            </Button>
            <Button 
              onClick={() => {
                setCurrentStatement(Math.floor(Math.random() * statements.length));
              }}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
            >
              Casuale
            </Button>
          </div>

          {/* Tips */}
          <Card className="bg-yellow-900/30 border-yellow-500/30 p-4">
            <div className="text-center text-yellow-200">
              <div className="text-lg mb-2">💡 Passa il telefono</div>
              <p className="text-sm">
                Fate leggere l'affermazione al giocatore di turno per maggiore suspense!
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
