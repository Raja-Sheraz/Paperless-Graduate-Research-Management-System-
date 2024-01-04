import axios from 'axios';
import {createContext,useState,useEffect} from 'react';
export const UserContext=createContext({})
export function UserContextProvider({children}){
    const [user,setUsers]=useState(null);
    useEffect(()=>{
        if(!user){
            axios.get('/profile').then(({data})=>{
                setUsers(data)
            })
        }
    },[])
    return(
        <UserContext.Provider value={{user,setUsers}}>
            {children}
        </UserContext.Provider>
    )
}