import React from 'react'

function Die(props) {

    
     /**
 * Challenge: Add conditional styling to the Die component
 * so that if it's held (isHeld === true), its background color
 * changes to a light green (#59E391)
 * 
 * Remember: currently the Die component has no way of knowing
 * if it's "held" or not.(check app.jsx line number 105 )
 */

  return (
    <div>
      <div>
        <button
          aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
        onClick={()=> props.hold(props.id)} style={{backgroundColor:props.isHeld ? "#59E391" : "white"}}> 
            {props.value}
        </button>
      </div>
    </div>
  )
}

export default Die
