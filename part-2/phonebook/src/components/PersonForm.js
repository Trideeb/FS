import React from "react";

const PersonForm = (props) => {
   return (
    <form onSubmit={props.addData}>
        <strong><h1>add a new</h1></strong>
        <div>
          name: <input onChange={props.handleDataChange} value={props.newName} />
        </div>
        <div>
          phone: <input onChange={props.handleNumberChange} value={props.newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm