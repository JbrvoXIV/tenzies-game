import React from "react"

const Statistics = (props) => {

    return (
        <section className="statistics-container">
            <p className="roll-counter">Amount of Rolls: {props.amountRolls}</p>
            <p className="time-counter">Timer: {props.timer.minutes}:{props.timer.seconds}</p>
            <p className="best-time">Best Time: {props.bestTime.minutes}:{props.bestTime.seconds}</p>
        </section>
    )

}

export default Statistics