import React from "react"

const Statistics = (props) => {

    return (
        <section className="statistics-container">
            <p className="roll-counter">Amount of Rolls: {props.amountRolls}</p>
            <p className="time-counter">Timer: {props.timer.minutes}:{props.timer.seconds}</p>
        </section>
    )

}

export default Statistics