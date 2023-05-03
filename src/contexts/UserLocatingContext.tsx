// create toggle context
import {createContext, useContext, useState} from "react";

const UserLocatingContext = createContext<any | undefined>(undefined)

// create context provider
// @ts-ignore
export const UserLocatingProvider = ({ children }) => {
    const [locating, setLocating] = useState({
        isLocating: false
    })

    // the value passed in here will be accessible anywhere in our application
    // you can pass any value, in our case we pass our state and it's update method
    return (
        <UserLocatingContext.Provider value={[locating, setLocating]}>
            { children }
        </UserLocatingContext.Provider>
    )
}

// useToggleContext will be used to use and update state across the app
// we can access to data and setData using this method
// anywhere in any component that's inside ToggleProvider
export const useUserLocatingContext = () => {
    return useContext(UserLocatingContext)
}