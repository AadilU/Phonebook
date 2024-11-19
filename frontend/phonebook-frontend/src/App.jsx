import { useState } from 'react'
import Contacts from './components/Contacts'
import AddContact from './components/AddContact'
import Error from './components/Error';

function App() {
  const [error, setError] = useState("");
  return (
    <>
      {error !== "" && <Error message={error}/>}
      <h1 style={{color:'green'}}>Phonebook</h1>
      <Contacts setError={setError}/>
    </>
  )
}

export default App
