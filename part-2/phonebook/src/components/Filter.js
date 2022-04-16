import React from 'react'

const Filter = (props) => {
return (
    <>
        filter shown with <input value={props.filterName} onChange={props.handleFilterChange} />
    </>
)
}

export default Filter