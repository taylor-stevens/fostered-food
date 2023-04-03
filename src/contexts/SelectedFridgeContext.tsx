import React, { createContext, useContext, useState } from "react"

// create toggle context
const SelectedFridgeContext = createContext<any | undefined>(undefined)

// create context provider
// @ts-ignore
export const SelectedFridgeProvider = ({ children }) => {
    const [selected, setSelected] = useState({
        fridge: undefined
    })

    // the value passed in here will be accessible anywhere in our application
    // you can pass any value, in our case we pass our state and it's update method
    return (
        <SelectedFridgeContext.Provider value={[selected, setSelected]}>
            { children }
        </SelectedFridgeContext.Provider>
    )
}

// useToggleContext will be used to use and update state across the app
// we can access to data and setData using this method
// anywhere in any component that's inside ToggleProvider
export const useSelectedFridgeContext = () => {
    return useContext(SelectedFridgeContext)
}