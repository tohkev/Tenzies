import React from 'react';
import Die from './components/Die.js'
import styles from './styles.css'


export default function App() {
  const [diceValues, setDiceValues] = React.useState(getAllNewDice())

  const [gameOver, setGameOver] = React.useState(false);


  //generates an array of 10 random numbers between 1-6
  function getAllNewDice() {
    let diceArray = []
    for (let i = 0; i < 10; i++) {
      let diceValue = Math.ceil(Math.random() * 6);
      diceArray.push({
        id: diceArray.length,
        value: diceValue,
        isFrozen: false
      });
    }
    return diceArray;
  }

  //rolls the next set of numbers, if a die is frozen, keep the old die
  function handleRoll() {
    setDiceValues(prevValues => {
      let newArr = getAllNewDice();
      return prevValues.map((die) => {
        return (
          !die.isFrozen ?
            newArr[die.id] :
            die
        )
      })
    })
  }

  //toggles and tracks isFrozen status for all dice
  function toggleFrozen(dieId) {
    setDiceValues(prevValues => {
      return prevValues.map(die => {
        return (
          die.id === dieId ?
            { ...die, isFrozen: !die.isFrozen } :
            die
        )
      })
    })
  }

  //based on the state, this will create the die elements to be rendered
  const dieElements = diceValues.map(die => {
    return <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isFrozen={die.isFrozen}
      toggleFrozen={toggleFrozen}
    />
  })

  //checks if the game is over by seeing if all values of diceValues are equal

  function resetGame() {
    setDiceValues(getAllNewDice())
    setGameOver(false)
  }

  React.useEffect(() => {
    function checkGameOver() {
      let res = diceValues.filter(die => die.value === diceValues[0].value)
      if (res.length === 10) {
        setGameOver(true);
      }
    }
    checkGameOver()
  }, [diceValues])

  return (
    <main className="game--container">
      <h1 className="game--heading">Tenzies</h1>
      <p className="game--instruction">Roll until all dice have the same value. Click each die to freeze it at its current value between rolls.</p>
      <section className="game--dice-block">
        {dieElements}
      </section>
      <section className="game--options">
        {!gameOver && <button className="game--roll-btn" onClick={handleRoll}>Roll</button>}
        {gameOver && <button className="game--reset-btn" onClick={resetGame}>Reset Game</button>}
      </section>
    </main>
  )
}
