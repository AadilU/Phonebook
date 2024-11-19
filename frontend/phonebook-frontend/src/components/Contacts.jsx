import React, { useEffect, useState } from 'react'
import services from '../services/Contacts'
import AddContact from './AddContact'

function Contacts({setError}) {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState("")

  const hook = () => {
    services.getAll().then(response => {
        setContacts(response.data)
    })
  }

  useEffect(hook, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().startsWith(search.toLowerCase()))

  return (
    <>
        <h2>Contacts</h2>
        <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={search} />
        <ul>
            {filteredContacts.map((contact, index) => <li key={index}>{contact.name + " " + contact.number}</li>)}
        </ul>
        <AddContact contacts={contacts} updateContacts={setContacts} setError={setError}/>
    </>
  )
}

export default Contacts