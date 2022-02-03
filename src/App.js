import React, { useState } from "react"
import Dice from "./components/Dice"
import "./styles/App.css"

const App = () => {
    
  const [dice, setDice] = useState(() => {
    return Array.from({ length: 10 }, () => Math.ceil(Math.random() * 6))
  })
  
  const newDice = () => {
    setDice(Array.from({ length: 10 }, () => Math.ceil(Math.random() * 6)))
  }

  const diceElements = dice.map(dice => {
    return (
      <Dice value={dice} />
    )
  })

  return (
    <main className="tenzies-container">
      <h1 className="tenzies-header">Tenzies</h1>
      <p className="tenzies-description">
        Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className="tenzies-dice-container">
        {diceElements}
      </div>
      <button className="tenzies-roll" onClick={newDice}>Roll</button>
    </main>
  )
}

export default App;
