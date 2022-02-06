import React, { useState, useEffect, useRef } from "react"
import Dice from "./components/Dice"
import Statistics from "./components/Statistics"
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

  const [timer, setTimer] = useState({ minutes: "00", seconds: "00" })

  const timerRef = useRef(false)

  const firstRenderRef = useRef(true)
  
  useEffect(() => {
    const value = dice[0].value
    if(dice.every(dice => dice.isHeld) && dice.every(dice => dice.value === value))
    setGameWon(true)
  }, [dice])
  
  useEffect(() => {

    let timeInterval

    if (firstRenderRef.current) {
      firstRenderRef.current = false
    } else {
      if(!timerRef.current) {
        timerRef.current = true
        timeInterval = setInterval(() => {
          setTimer(oldTime => ({
            minutes: parseInt(oldTime.seconds) === 59 && parseInt(oldTime.minutes) < 9 ? "0" + (parseInt(oldTime.minutes) + 1).toString()
            : parseInt(oldTime.seconds) === 59 ? (parseInt(oldTime.minutes) + 1).toString() 
            : oldTime.minutes,
            seconds: parseInt(oldTime.seconds) === 59 ? "00" 
            : parseInt(oldTime.seconds) < 9 ? "0" + (parseInt(oldTime.seconds) + 1).toString()
            : (parseInt(oldTime.seconds) + 1).toString()
          }))
        }, 1000)
      }
    }

    if(gameWon) {
      console.log("Game Won")
      clearInterval(timeInterval)
    }

  }, [dice, gameWon])

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
      <Statistics 
        amountRolls={amountRolls}
        timer={timer}
      />
    </main>
  )
}

export default App;
