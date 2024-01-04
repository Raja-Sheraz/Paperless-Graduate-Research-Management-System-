import React, { createContext, useState } from 'react'

// Create the context
export const UserContext = createContext()

// Create the context provider

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [updatePDf, setUpdatePDF] = useState({})

    return <UserContext.Provider value={{ user, setUser, updatePDf, setUpdatePDF }}>{children}</UserContext.Provider>
}
