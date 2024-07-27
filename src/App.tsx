import { useState, useEffect, useRef } from "react"
import './App.css'
import { characters } from "./characters"
import { Button } from "./components/ui/button"

const senseiChars = characters.filter(char => char.scores.sensei !== -1)
const hakiChars = characters.filter(char => char.scores.haki !== -1)
const fruitChars = characters.filter(char => char.scores.fruit !== -1)
const mindChars = characters.filter(char => char.scores.mind !== -1)
const raceChars = characters.filter(char => char.scores.race !== -1)

type BlockTitle = 'Sensei' | 'Haki' | 'Devil Fruit' | 'Mind' | 'Race'

type Props = {
  characterImage: string
  characterName: string
  title: BlockTitle
  onClick: () => void
  choosen?: boolean
}

const ImageChooser = ({ characterImage, characterName, title, onClick, choosen }: Props) => {
  return (
    <div className={`flex flex-col items-center ${choosen ? 'border-2 border-slate-200 rounded-md' : ''}`} onClick={onClick}>
      <img src={characterImage} alt={characterName} className="w-24 h-24 object-cover rounded-md" />
      <p className="mt-2 text-lg">{title}</p>
    </div>
  )
}

const getRandom = (limit: number) => Math.floor(Math.random() * ((limit -1) - 0 + 1));

const maxIterations = 10;

export default function App() {
  const [currentSensei, setCurrentSensei] = useState(senseiChars[0])
  const [currentHaki, setCurrentHaki] = useState(hakiChars[0])
  const [currentFruit, setCurrentFruit] = useState(fruitChars[0])
  const [currentMind, setCurrentMind] = useState(mindChars[0])
  const [currentRace, setCurrentRace] = useState(raceChars[0])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [_, setIterationCount] = useState(0)
  const [selectedChars, setSelectedChars] = useState<BlockTitle[]>([])
  const [bounty, setBounty] = useState<number | null>(null)

  function handleRestart() {
    setBounty(null)
    setIterationCount(0);
    setSelectedChars([])
  }

  function calculateBounty() {
    return ((currentSensei.scores.sensei * 2) + (currentHaki.scores.haki * 2.5) + (currentFruit.scores.fruit * 1.5) + (currentMind.scores.mind* 3) + (currentRace.scores.race * 1.5)) * 10000
  }
 
  function runChooser() {
    // Limpa o intervalo existente, se houver
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    const interval = setInterval(() => {
      setIterationCount(prevIteration => {
        console.log({ prevIteration, maxIterations, selectedChars})
        if (prevIteration < maxIterations - 1) {
          if (!selectedChars.includes("Sensei")) {
            setCurrentSensei(senseiChars[getRandom(senseiChars.length)]);
          }

          if (!selectedChars.includes("Haki")) {
            setCurrentHaki(hakiChars[getRandom(hakiChars.length)]);
          }
          
          if (!selectedChars.includes("Devil Fruit")) {
            setCurrentFruit(fruitChars[getRandom(fruitChars.length)]);
          }

          if (!selectedChars.includes("Mind")) {
            setCurrentMind(mindChars[getRandom(mindChars.length)]);
          }
          if (!selectedChars.includes("Race")) {
            setCurrentRace(raceChars[getRandom(raceChars.length)]);
          }

          return prevIteration + 1;
        } else {
          clearInterval(interval);
          return prevIteration; // Não incrementar mais
        }
      });
    }, 150);

    intervalRef.current = interval; // Armazena a referência do intervalo
  }

  function handleCharacterClick(block: BlockTitle) {
    setSelectedChars([...new Set([...selectedChars, block])])
    setIterationCount(0)
  }

  useEffect(() => {
    if (selectedChars.length < 5) {
      runChooser();
    } else {
      const currentBounty = calculateBounty()
      console.log({currentBounty })
      setBounty(currentBounty)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [selectedChars]);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center mb-4">
        {!bounty && <>
          <h1 className="text-3xl font-bold text-yellow-500">What is your Bounty?</h1>
          <p className="text-4xl font-bold text-yellow-500">$ ??? </p>
        </>}
        {bounty && <>
          <h1 className="text-3xl font-bold text-yellow-500">Your Bounty is:</h1>
          <p className="text-4xl font-bold text-yellow-500">$ {bounty.toLocaleString()} </p>
        </>}
      </div>
      <div className="flex space-x-4 mb-8">
        {/* boxes */}
        <ImageChooser title="Sensei" characterImage={currentSensei.image} characterName={currentSensei.name} onClick={() => handleCharacterClick('Sensei')} choosen={selectedChars.includes("Sensei")} />
        <ImageChooser title="Haki" characterImage={currentHaki.image} characterName={currentHaki.name} onClick={() => handleCharacterClick("Haki")} choosen={selectedChars.includes("Haki")} />
        <ImageChooser title="Devil Fruit" characterImage={currentFruit.image} characterName={currentFruit.name} onClick={() => handleCharacterClick("Devil Fruit")} choosen={selectedChars.includes("Devil Fruit")} />
        <ImageChooser title="Mind" characterImage={currentMind.image} characterName={currentMind.name} onClick={() => handleCharacterClick("Mind")} choosen={selectedChars.includes("Mind")} />
        <ImageChooser title="Race" characterImage={currentRace.image} characterName={currentRace.name} onClick={() => handleCharacterClick("Race")} choosen={selectedChars.includes("Race")} />
      </div>
      <Button variant={"secondary"} onClick={handleRestart}>Restart</Button>
    </div>
  )
}

