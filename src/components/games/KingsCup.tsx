
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const cardRules = {
  'A': 'Waterfall - Tutti bevono insieme',
  '2': 'Tu bevi - Scegli qualcuno che beve',
  '3': 'Io bevo - Tu bevi',
  '4': 'Pavimento - Ultimo a toccare il pavimento beve',
  '5': 'Ragazzi bevono - Solo i maschi',
  '6': 'Ragazze bevono - Solo le femmine', 
  '7': 'Paradiso - Ultimo a alzare la mano beve',
  '8': 'Compagno - Scegli un compagno di bevute',
  '9': 'Rima - Dì una parola, gli altri devono rimare',
  '10': 'Categoria - Dì una categoria, tutti elencano',
  'J': 'Regola - Inventa una nuova regola',
  'Q': 'Domanda - Fai una domanda, chi risponde beve',
  'K': 'King\'s Cup - Versa nel bicchiere centrale'
};

const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const KingsCup = () => {
  const [currentCard, setCurrentCard] = useState<string | null>(null);
  const [usedCards, setUsedCards] = useState<string[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [remainingCards, setRemainingCards] = useState(52);

  const drawCard = () => {
    if (remainingCards === 0) return;
    
    setIsFlipping(true);
    setTimeout(() => {
      const availableCards = cards.filter(card => {
        const usedCount = usedCards.filter(used => used === card).length;
        return usedCount < 4;
      });
      
      if (availableCards.length > 0) {
        const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
        setCurrentCard(randomCard);
        setUsedCards([...usedCards, randomCard]);
        setRemainingCards(remainingCards - 1);
      }
      setIsFlipping(false);
    }, 300);
  };

  const shuffleDeck = () => {
    setCurrentCard(null);
    setUsedCards([]);
    setRemainingCards(52);
    setIsFlipping(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs defaultValue="play" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/30">
          <TabsTrigger value="rules" className="text-white data-[state=active]:bg-purple-600">
            Regole
          </TabsTrigger>
          <TabsTrigger value="play" className="text-white data-[state=active]:bg-purple-600">
            Gioca
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card className="bg-black/30 border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Come si gioca</h2>
            <div className="space-y-3 text-white/90">
              <p>• Posizionate un bicchiere grande al centro del tavolo</p>
              <p>• A turno, ogni giocatore pesca una carta</p>
              <p>• Seguite la regola associata alla carta</p>
              <p>• Il gioco finisce quando vengono pescati tutti e 4 i Re</p>
            </div>
          </Card>
          
          <Card className="bg-black/30 border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Regole delle Carte</h3>
            <div className="grid gap-2 text-sm">
              {Object.entries(cardRules).map(([card, rule]) => (
                <div key={card} className="flex items-start gap-3 text-white/90">
                  <span className="font-bold text-purple-300 min-w-[30px]">{card}:</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="bg-red-900/30 border-red-500/30 p-4">
            <p className="text-red-200 text-sm text-center">
              ⚠️ Bevi sempre responsabilmente e rispetta i tuoi limiti
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="play" className="space-y-6">
          {/* Game Status */}
          <div className="text-center text-white">
            <p className="text-lg">Carte rimanenti: <span className="font-bold text-purple-300">{remainingCards}</span></p>
            <p className="text-sm text-white/70">Re pescati: {usedCards.filter(card => card === 'K').length}/4</p>
          </div>

          {/* Card Display */}
          <div className="flex justify-center">
            <Card 
              className={`w-48 h-72 flex flex-col items-center justify-center cursor-pointer border-2 transition-all duration-300 ${
                isFlipping ? 'animate-flip-card' : ''
              } ${currentCard ? 'bg-white border-purple-500' : 'bg-purple-900/50 border-purple-300/50'} haptic-feedback`}
              onClick={drawCard}
            >
              {currentCard ? (
                <div className="text-center">
                  <div className="text-6xl font-bold text-purple-900 mb-4">
                    {currentCard}
                  </div>
                  <div className="text-sm text-purple-700 px-4 text-center">
                    {cardRules[currentCard as keyof typeof cardRules]}
                  </div>
                </div>
              ) : (
                <div className="text-center text-white">
                  <div className="text-4xl mb-4">🃏</div>
                  <p className="text-lg">Tocca per pescare</p>
                  <p className="text-sm text-white/70">una carta</p>
                </div>
              )}
            </Card>
          </div>

          {/* Current Rule */}
          {currentCard && (
            <Card className="bg-purple-900/50 border-purple-300/50 p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Regola Attiva</h3>
                <p className="text-purple-200 text-lg">
                  {cardRules[currentCard as keyof typeof cardRules]}
                </p>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={drawCard}
              disabled={remainingCards === 0}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg haptic-feedback"
            >
              Pesca Carta
            </Button>
            <Button 
              onClick={shuffleDeck}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
            >
              Ricomincia
            </Button>
          </div>

          {/* Game Over */}
          {usedCards.filter(card => card === 'K').length === 4 && (
            <Card className="bg-red-900/50 border-red-500/50 p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-red-200 mb-2">🏆 Gioco Finito!</h3>
                <p className="text-red-300">Chi ha pescato l'ultimo Re beve il King's Cup!</p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
