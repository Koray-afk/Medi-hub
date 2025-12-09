import { createContext } from "react";
export const AppContext = createContext()

// Now make a provider 
const AppContextProvider =(props)=>{
    const value ={

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider