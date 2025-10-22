import { Navigate, useNavigate } from "react-router"
import { useUser } from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../constants"

export const AdminRoute = ({children}) => {

    const[user,setUser] = useState();
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();
    

    const getUser = async()=>{
        try {
            const response = await fetch(`${BASE_URL}/auth`, {
                credentials: 'include'
            })

            const data = await response.json();

            if(!data.success){
                setLoading(false)
                navigate('/')
                return
            }
            
            setUser(data?.user)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getUser();
    },[])

    if(loading){
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    }

    return (
        user && user?.role === "admin" ? <div>
            {children}
        </div> : (user?.role === "user" ? <Navigate to={'/'} /> : <div className="min-h-screen flex justify-center items-center"></div>)
    )
}