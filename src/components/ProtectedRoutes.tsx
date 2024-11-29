import React, {FC, useEffect} from 'react'
import { useAppContext } from '../hooks/AppContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes: FC<{chlidren : React.ReactNode}> = ({chlidren}) => {

    const {isLoggedIn} = useAppContext()
    const navigate = useNavigate()
    console.log('isLoggedIn', isLoggedIn)
    useEffect(()=>{
        if(!isLoggedIn)
            navigate('/')
    },[isLoggedIn, navigate])

  return (
    <>{chlidren}</>
  )
}

export default ProtectedRoutes