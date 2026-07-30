import React, { useEffect, useRef, useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
    const buttonRef = useRef(null)
    const [dice, setDice] = useState(generateAllNewDice())
    const [rollCount, setRollCount] = useState(0)
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    useEffect(() => {
        function handleResize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    function generateAllNewDice() {
        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }))
    }

    function hold(id) {
        setDice(oldDice =>
            oldDice.map(die =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        )
    }

    function rollDice() {
        if (!gameWon) {
            setRollCount(c => c + 1)
            setDice(oldDice =>
                oldDice.map(die =>
                    die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
                )
            )
        } else {
            setRollCount(0)
            setDice(generateAllNewDice())
        }
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={hold}
            id={dieObj.id}
        />
    ))

    return (
        <div>
            <main>
                {gameWon && (
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        colors={['#C9A24B', '#E3C878', '#F3ECDD', '#12332A']}
                        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 999 }}
                    />
                )}

                <div aria-live="polite" className="sr-only">
                    {gameWon && (
                        <p>Congratulations! You won! Press "New Game" to start again.</p>
                    )}
                </div>

                <p className="eyebrow">Tenzies · Roll &amp; Match</p>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">
                    Roll until all dice match. Click a die to hold it at its current value.
                </p>

                <div className="dice-container">
                    {diceElements}
                </div>

                <div className="game-footer">
                    <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
                        {gameWon ? 'New Game' : 'Roll Dice'}
                    </button>
                    <p className="roll-count">
                        Rolls <strong>{rollCount}</strong>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default App