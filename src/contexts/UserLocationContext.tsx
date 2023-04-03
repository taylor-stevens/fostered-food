import React, { createContext, useContext, useState } from "react"

// create toggle context
const UserLocationContext = createContext<any | undefined>(undefined)

// create context provider
// @ts-ignore
export const UserLocationProvider = ({ children }) => {
    const [location, setLocation] = useState({
        userLocation: undefined
    })

    // the value passed in here will be accessible anywhere in our application
    // you can pass any value, in our case we pass our state and it's update method
    return (
        <UserLocationContext.Provider value={[location, setLocation]}>
            { children }
        </UserLocationContext.Provider>
    )
}

// useToggleContext will be used to use and update state across the app
// we can access to data and setData using this method
// anywhere in any component that's inside ToggleProvider
export const useUserLocationContext = () => {
    return useContext(UserLocationContext)
}