import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const GetUsers = () => {

    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([])
    const [listOfUsers, setListOfUsers] = useState([])

    useEffect(() => {
        const verifyUser = async () => {
            if(!cookies.jwt) {
                navigate("/") 
            } else {
                const { data } = await axios.post(
                    "http://localhost:4003",
                    {},
                    {
                        withCredentials: true,
                    }
                )

                    if(!data.admin){

                        navigate("/")
                    }


                if (!data.status) {
                    removeCookie("jwt")
                    navigate("/")
                } else {
                    axios.get('http://localhost:4003/getUsers').then((response) => {
                        setListOfUsers(response.data)
                    })
                }
            }
        }
        verifyUser()
    }, [cookies, navigate, removeCookie])

  return (
    <div>
        {listOfUsers.map(user =>{
            return(
                <div style={{ backgroundColor: "darkgray", marginTop: "5vh"}}>
                    <p>
                    {user.name}
                    </p>
                    <p>
                    {user.email}
                    </p>
                    <p>
                    {user.phone}
                    </p>
                </div>
            )
        })}
    </div>
  )
}

export default GetUsers