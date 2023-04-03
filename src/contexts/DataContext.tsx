// create toggle context
import {createContext, useContext, useState} from "react";

const DataContext = createContext<any | undefined>(undefined)

// create context provider
// @ts-ignore
export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
        fridges: undefined
    })

    // the value passed in here will be accessible anywhere in our application
    // you can pass any value, in our case we pass our state and it's update method
    return (
        <DataContext.Provider value={[data, setData]}>
            { children }
        </DataContext.Provider>
)
}

// useToggleContext will be used to use and update state across the app
// we can access to data and setData using this method
// anywhere in any component that's inside ToggleProvider
export const useDataContext = () => {
    return useContext(DataContext)
}