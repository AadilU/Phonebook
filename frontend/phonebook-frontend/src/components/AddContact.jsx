import React, { useState } from 'react'
import services from '../services/Contacts'
import Error from './Error'

function AddContact({contacts, updateContacts, setError}) {
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  
  const handleOnNameChange = (e) => {
    setName(e.target.value)
  }

  const handleOnNumberChange = (e) => {
    setNumber(e.target.value)
  }

  return (
    <>
        <h2>Add Contact</h2>
        <form>
            <input
                type="text"
                placeholder="Enter Name"
                onChange={handleOnNameChange}
                value={name} 
            />
            <br/>
            <br/>
            <input
                type="text"
                placeholder="Enter Number"
                onChange={handleOnNumberChange}
                value={number} 
            />
            <br/>
            <br/>
            <button onClick={(e) => {
                e.preventDefault()
                services.addPerson(name, number).then((response) => {
                  if(contacts.find(contact => contact.name === response.data.name))
                    updateContacts(contacts.map(contact => contact.name === response.data.name ? {...contact, number: response.data.number} : contact))
                  else
                    updateContacts(contacts.concat(response.data))
                  setName('')
                  setNumber('')
                })
                .catch(err => {
                  setError(err.response.data.error)
                  setTimeout(() => {
                    setError("")
                  }, 3000)
                })
            }}>
                Submit
            </button>
        </form>
    </>
  )
}

export default AddContact