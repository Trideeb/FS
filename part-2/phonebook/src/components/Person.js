import React from "react";

const Person = ({person, deleteData}) => {
    return (
        <p>{person.name} {person.number} <button onClick={() => deleteData(person.id)}>delete</button></p>
    )
}

export default Person