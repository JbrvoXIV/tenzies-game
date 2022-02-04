import React from "react"

const Dice = ({ holdDice, value, isHeld }) => {

    const styles = {
        backgroundColor: isHeld ? "#1fde58" : "white"
    }

    return (
        <div 
            className="tenzies-dice" 
            onClick={holdDice}
            style={styles}
        >
            {value}
        </div>
    )
}

export default Dice