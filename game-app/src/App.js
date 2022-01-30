import React from 'react';
import Die from './components/Die.js'
import styles from './styles.css'


export default function App() {
  const [diceValues, setDiceValues] = React.useState(getAllNewDice())


  //generates an array of 10 random numbers between 1-6
  function getAllNewDice() {
    let diceArray = []
    for (let i = 0; i < 10; i++) {
      let diceValue = Math.ceil(Math.random() * 6);
      diceArray.push(diceValue);
    }
    return diceArray;
  }

  //based on the state, this will create the die elements to be rendered
  const dieElements = diceValues.map(dieValue => {
    return <Die value={dieValue} />
  })

  return (
    <main className="game--container">
      <h1 className="game--heading">Tenzies</h1>
      <p className="game--instruction">Roll until all dice have the same value. Click each die to freeze it at its current value between rolls.</p>
      <section className="game--dice-block">
        {dieElements}
      </section>
      <button className="game--roll-btn">Roll</button>
    </main>
  )
}
