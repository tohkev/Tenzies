import React from 'react';
import Die from './components/Die.js'
import styles from './styles.css'
import Confetti from './components/Confetti.js'


export default function App() {
  const [dice, setDice] = React.useState(getAllNewDice())

  const [gameOver, setGameOver] = React.useState(false)

  const [score, setScore] = React.useState({
    'current': 0,
    'best': localStorage.getItem('best') || 999999
  })

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
    setDice(prevValues => {
      return prevValues.map((die) => {
        return (
          die.isFrozen ?
            die :
            { ...die, value: Math.ceil(Math.random() * 6) }
        )
      })
    })

    setScore(prevScore => {
      return {
        ...prevScore,
        current: prevScore.current + 1
      }
    })
  }

  //toggles and tracks isFrozen status for all dice
  function toggleFrozen(dieId) {
    setDice(prevValues => {
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
  const dieElements = dice.map(die => {
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
    setDice(getAllNewDice())
    setGameOver(false)
    setScore({
      current: 0,
      best: JSON.parse(localStorage.getItem('best')) || 999999
    })
  }

  React.useEffect(() => {
    function checkGameOver() {
      let res = dice.filter(die => (die.value === dice[0].value && die.isFrozen))
      if (res.length === 10) {
        localStorage.setItem('best', JSON.stringify(Math.min(score.current, score.best)))
        setGameOver(true);
      }
    }
    checkGameOver()
  }, [dice, score])

  return (
    <main className="game--container">
      {gameOver && <Confetti />}
      <h1 className="game--heading">Tenzies</h1>
      <p className="game--instruction">Roll until all dice have the same value. Click each die to freeze it at its current value between rolls.</p>
      <section className="game--dice-block">
        {dieElements}
      </section>
      <section className="game--options">
        {!gameOver && <button className="game--roll-btn" onClick={handleRoll}>Roll</button>}
        {gameOver && <button className="game--reset-btn" onClick={resetGame}>Reset Game</button>}
        <div className="game--score">
          <div className="game--current-score">
            <p>Current Score:</p>
            <p>{score.current}</p>
          </div>
          <div className="game--best-score">
            <p>Best Score:</p>
            <p>{score.best < 999999 ? score.best : "-"}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
