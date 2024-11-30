import React, {FC, useEffect} from 'react'
import { useAppContext } from '../hooks/AppContext';
import useNavigateToPages from "../hooks/useNavigateToPages";
import { getToken } from '../service/StorageService';

const ProtectedRoutes: FC<{chlidren : React.ReactNode}> = ({chlidren}) => {
    const token = getToken()
    //const {isLoggedIn} = useAppContext()
    const {naviagteToLogin} = useNavigateToPages()
    useEffect(()=>{
        if(token && token.length === 0)
          naviagteToLogin()
    },[])

  return (
    <>{chlidren}</>
  )
}

export default ProtectedRoutes