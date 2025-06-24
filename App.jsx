import React, { useEffect, useRef } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid';
import Confetti from "react-confetti"

function App() {

    /**
  * Challenge:
  * Make it so when the game is over, the "New Game" button
  * automatically receives keyboard focus so keyboard users
  * can easily trigger that button without having to tab
  * through all the dice first.
  * 
  * Hints:
  * 1. Focusing a DOM element with the DOMNode.focus() method
  *    requires accessing the native DOM node. What tool have
  *    we learned about that allows us to do that?
  * 
  * 2. Automatically calling the .focus() on a DOM element when
  *    the game is won requires us to synchronize the local
  *    `gameWon` variable with an external system (the DOM). What
  *    tool have we learned about that allows us to do that?
  */

    const buttonRef = useRef(null)
    // console.log(buttonRef);




    /**
   * Challenge: Create a function `hold` that takes
   * `id` as a parameter. For now, just have the function
   * console.log(id).
   * 
   * Then, figure out how to pass that function down to each
   * instance of the Die component so when each one is clicked,
   * it logs its own unique ID property. (Hint: there's more
   * than one way to make that work, so just choose whichever
   * you want)y
   * 
   */

    /**
* Challenge: Update the `hold` function to flip
* the `isHeld` property on the object in the array
* that was clicked, based on the `id` prop passed
* into the function.
* 
* Hint: as usual, there's more than one way to 
* accomplish this.
*/


    function hold(id) {
        // console.log(id);
        setDice(oldDice => {
            return oldDice.map(die => {
                return die.id === id ?
                    { ...die, isHeld: !die.isHeld } : die
            }
            )
        })

        /**
* Challenge:
* 
* Write a function (generateAllNewDice) that returns an array 
* of 10 random numbers between 1-6 inclusive.
* 
* Log the array of numbers to the console for now
*/

    }

    function generateAllNewDice() {

        /**
* Challenge: Update the array of numbers in state to be
* an array of objects instead. Each object should look like:
* { value: <random number>, isHeld: false }
* 
* Making this change will break parts of our code, so make
* sure to update things so we're back to a working state
*/

        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }))

        // create a new array
        // const newDice = []
        // loop ten time 
        // for (let i = 0; i < 10; i++) {
        // const rand = Math.floor(Math.random() * 6)
        // newDice.push(rand)
        // }
        // return newDice

        // generate a random number to the array 
        // return the array
        console.log(generateAllNewDice());
    }

    /**
     * Challenge:
     * 
     * Create state to hold our array of numbers. (Initialize
     * the state by calling our `generateAllNewDice` function so it 
     * loads all new dice as soon as the app loads)
     * 
     * Map over the state numbers array to generate our array
     * of Die elements and render those in place of our
     * manually-written 10 Die elements.
     */

    const [dice, setDice] = React.useState(generateAllNewDice())



    const diceElements = dice.map(dieObj => <Die
        key={dieObj.id}
        value={dieObj.value}
        isHeld={dieObj.isHeld}
        hold={hold}
        id={dieObj.id} />)



    /**
     * Challenge: Create a `Roll Dice` button that will re-roll
     * all 10 dice
     * 
     * Clicking the button should generate a new array of numbers
     * and set the `dice` state to that new array (thus re-rendering
     * the array to the page)
     */

    /**
   * Challenge: Update the `rollDice` function to not just roll
   * all new dice, but instead to look through the existing dice
   * to NOT role any that are being `held`.
   * 
   * Hint: this will look relatively similiar to the `hold`
   * function below. When we're "rolling" a die, we're really
   * just updating the `value` property of the die object.
   */

    function rollDice() {
        // setDice(generateAllNewDice())

        if (!gameWon) {
            setDice(saveDice => saveDice.map(die =>
                die.isHeld ?


                    die :
                    {
                        ...die, value: Math.ceil(Math.random() * 6)
                    }

            ))

        } else {
            setDice(generateAllNewDice())
        }

    }





    // check if the game is won

    /**
     * Critical thinking time!
     * 
     * We want to indicate to the user that the game is over
     * if (1) all the dice are held, and (2) all the dice have
     * the same value.
     * 
     * How might we do this? Some questions to consider:
     * 
     * 1. Do we need to save a `gameWon` value in state? If so, why?
     *    If not, why not?
     * No.
     * 
     * 
     * 2. Do we need to create a side effect to synchronize the `gameWon`
     *    value (whether it's in state or not) with the current state of 
     *    the dice?
     * No.
     * 
     * 
     * Conclusion:
     * We can derive the gameWon status based on the condition(s) of the current
     * dice state on every render.
     */

    /**
   * Challenge:
   * Log "Game won!" to the console only if the 2 winning
   * conditions are met.
   * 
   * 1. all the dice are being held, and
   * 2. all the dice have the same value
   * 
   * For now, no need to even save a variable!
   */

    //   here wht we have used is an array method called EVERY

    //   if(dice.every(die => die.isHeld)&& dice.every(die => die.value === dice[0].value))
    //   {
    //     console.log("Game is Won!"); 
    //   }

    /**
  * Challenge part 2:
  * 1. Create a new `gameWon` variable.
  * 2. If `gameWon` is true, change the button text to
  *    "New Game" instead of "Roll"
  */

    const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }

    }, [gameWon])





    return (
        <div>
            <main>
                {/* the above Confetti is the npm i react-confetti where it displays the confetti on the screen when we complete the game. */}

                {gameWon && <Confetti />}

                <div aria-live='polite' className='sr-only'>
                    {gameWon && <p>Congratulations! Youn Won! Press "New Game" to start Again!</p>}
                </div>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

                <div className='dice-container'>
                    {diceElements}
                </div>

                <div>
                    {gameWon === true ? <button ref={buttonRef} className='roll-dice' onClick={rollDice} >New Game</button>
                        :
                        <button ref={buttonRef} className='roll-dice' onClick={rollDice} >Roll Dice</button>}
                </div>

            </main>
        </div>
    )
}

export default App