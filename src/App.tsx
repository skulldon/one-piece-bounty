import { useState, useEffect } from "react"
import './App.css'
import { characters } from "./characters"

const senseiChars = characters.filter(char => char.scores.sensei !== -1)
const hakiChars = characters.filter(char => char.scores.haki !== -1)
const fruitChars = characters.filter(char => char.scores.fruit !== -1)
const mindChars = characters.filter(char => char.scores.mind !== -1)
const raceChars = characters.filter(char => char.scores.race !== -1)

export default function App() {
  const [currentSensei, setCurrentSensei] = useState(senseiChars[0])
  const [currentHaki, setCurrentHaki] = useState(hakiChars[0])
  const [currentFruit, setCurrentFruit] = useState(fruitChars[0])
  const [currentMind, setCurrentMind] = useState(mindChars[0])
  const [currentRace, setCurrentRace] = useState(raceChars[0])
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSensei(() => {
        const shuffledImages = [...senseiChars].sort(() => 0.5 - Math.random())
        return shuffledImages[0]
      })
      setCurrentHaki(() => {
        const shuffledImages = [...hakiChars].sort(() => 0.5 - Math.random())
        return shuffledImages[0]
      })
      setCurrentFruit(() => {
        const shuffledImages = [...fruitChars].sort(() => 0.5 - Math.random())
        return shuffledImages[0]
      })
      setCurrentMind(() => {
        const shuffledImages = [...mindChars].sort(() => 0.5 - Math.random())
        return shuffledImages[0]
      })
      setCurrentRace(() => {
        const shuffledImages = [...raceChars].sort(() => 0.5 - Math.random())
        return shuffledImages[0]
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-yellow-500">Bounty:</h1>
        <p className="text-4xl font-bold text-yellow-500">$ 8,300,000,000</p>
      </div>
      <div className="flex space-x-4">
        {/* boxes */}
        <div className="flex flex-col items-center">
          <img src={currentSensei.image} alt={currentSensei.name} className="w-24 h-24 object-cover rounded-md" />
          <p className="mt-2 text-lg">Sensei</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={currentHaki.image} alt={currentHaki.name} className="w-24 h-24 object-cover rounded-md" />
          <p className="mt-2 text-lg">Haki</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={currentFruit.image} alt={currentFruit.name} className="w-24 h-24 object-cover rounded-md" />
          <p className="mt-2 text-lg">Devil Fruit</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={currentMind.image} alt={currentMind.name} className="w-24 h-24 object-cover rounded-md" />
          <p className="mt-2 text-lg">Mind</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={currentRace.image} alt={currentRace.name} className="w-24 h-24 object-cover rounded-md" />
          <p className="mt-2 text-lg">Race</p>
        </div>
      </div>
    </div>
  )
}

