    import { createContext, useCallback, useContext, useEffect, useState } from "react";
    import { useAuth } from "./AuthContext";

    import axios from "axios";

    const TuContext = createContext()

    export const TuProvider = ({children}) => {
        const {token} = useAuth()
        const [tataUsaha , setTataUsaha] = useState([])
        const[formData,setFormData] = useState({
                name:"",
                address:"",
                city:"",
                country:"",
                password:"",
            })



        const fetchDataTu = useCallback(async () =>{
            try {
                const res = await axios.get("http://localhost:8080/api/tata-usaha",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setTataUsaha(res.data)
                console.log(res.data)
            } catch (error) {
                console.error(error)
            }
        },[token])

        const tambahTu = async () =>{
            try {
                const res = await axios.post("http://localhost:8080/api/tata-usaha", {
                    name: formData.name,
                    address: formData.address,
                    city: formData.city,
                    country: formData.country,
                    password: formData.password,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setTataUsaha((prev) => [...prev, res.data]) // refresh data setelah tambah
               
            } catch (error) {
                console.error(error)
                throw error
            }
        }

        const hapusTu = async (id) => {
            try {
                await axios.delete(`http://localhost:8080/api/tata-usaha/${id}`)
                await fetchDataTu()
            } catch (error) {
                console.error(error)
            }
        }
        
        useEffect(() => {
            fetchDataTu()
        },[fetchDataTu])

        return(
            <TuContext.Provider value={{tataUsaha , tambahTu , hapusTu , fetchDataTu , setFormData , formData}} >
                {children}
            </TuContext.Provider>
        )

    }

    export const useTu = () => useContext(TuContext)