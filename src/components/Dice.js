import React from "react"

const Dice = ({ holdDice, value, isHeld }) => {

    const Pip = () => <span className="pip"></span>

    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }

    const pipElement = Array.from({ length: value }, (_, i) => <Pip key={i} />)

    return (
        <div 
            className="tenzies-dice" 
            onClick={holdDice}
            style={styles}
        >
            {pipElement}
        </div>
    )
}

export default Dice