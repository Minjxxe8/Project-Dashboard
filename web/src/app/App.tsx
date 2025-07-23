// @ts-ignore
import React, { useEffect, useState } from 'react'

const App = () => {
    const [message, setMessage] = useState('...')

    useEffect(() => {
        fetch('http://localhost:8080/api/ping')
            .then(res => res.json())
            .then(data => {
                console.log("Données reçues :", data)
                setMessage(data.message)
            })
            .catch(err => {
                console.error("Erreur fetch :", err)
                setMessage("Erreur")
            })
    }, [])


    return (
        <div>
            <h1>Backend says: {message} ohayo</h1>
        </div>
    )
}

export default App


