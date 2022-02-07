import React from "react"

const Statistics = (props) => {

    const bestTime = localStorage.getItem("bestTime") === null
                    ? {  minutes: "00", seconds: "00" }
                    : JSON.parse(localStorage.getItem("bestTime"))

    return (
        <section className="statistics-container">
            <p className="roll-counter">Amount of Rolls: {props.amountRolls}</p>
            <p className="time-counter">Timer: {props.timer.minutes}:{props.timer.seconds}</p>
            <p className="best-time">Best Time: {bestTime.minutes}:{bestTime.seconds}</p>
        </section>
    )

}

export default Statistics