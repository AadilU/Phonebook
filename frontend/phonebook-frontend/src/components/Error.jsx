import React from 'react'

function Error({message}) {
  return (
    <div style={{
        border: "4px solid red",
        margin: "-8px",
        padding: "4px"
    }}>
        <h3 style={{
            color: "red"
        }}>{message}</h3>
    </div>
  )
}

export default Error