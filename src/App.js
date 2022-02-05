import React, { useState, useEffect } from "react"
import Dice from "./components/Dice"
import "./styles/App.css"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

const App = () => {
    
  const [dice, setDice] = useState(() => {
    return Array.from({ length: 10 }, () => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }))
  })

  const [gameWon, setGameWon] = useState(false)

  const [amountRolls, setAmountRolls] = useState(0)

  useEffect(() => {
    const value = dice[0].value
    if(dice.every(dice => dice.isHeld) && dice.every(dice => dice.value === value))
      setGameWon(true)
  }, [dice])
  
  const newDice = () => {
    if(gameWon){
      setGameWon(false)
      setDice(Array.from({ length: 10 }, () => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })))
    } else {
      setDice(oldDice => oldDice.map(dice => {
        return dice.isHeld
              ? dice
              : {...dice, value: Math.ceil(Math.random() * 6)}
      }))
    }
  }

  const holdDice = (diceId) => {
    setDice(oldDice => oldDice.map(dice => {
      return diceId === dice.id
            ? {...dice, isHeld: !dice.isHeld}
            : dice
    }))
  }

  const updateRollAmount = () => {
    if(gameWon)
      setAmountRolls(0)
    else
      setAmountRolls(oldAmount => oldAmount + 1)
  }

  const diceElements = dice.map(dice => {
    return (
      <Dice 
        key={dice.id}
        holdDice={() => holdDice(dice.id)}
        value={dice.value} 
        isHeld={dice.isHeld}
      />
    )
  })

  return (
    <main className="tenzies-container">
      {gameWon && <Confetti />}
      <h1 className="tenzies-header">Tenzies</h1>
      <p className="tenzies-description">
        {gameWon ? "You've Won!" : 
        "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
      </p>
      <div className="tenzies-dice-container">
        {diceElements}
      </div>
      <button 
        className="tenzies-roll-button" 
        onClick={() => {
          newDice();
          updateRollAmount();
        }}
      >
        {gameWon ? "Play Again" : "Roll"}
      </button>
      <p className="roll-counter">Amount of Rolls: {amountRolls}</p>
    </main>
  )
}

export default App;
