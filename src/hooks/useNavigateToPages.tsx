import { useNavigate } from "react-router-dom";

const useNavigateToPages = () => {
    const navigate = useNavigate()

    const naviagteToLogin = () => navigate('/login')
    const naviagteToRegister = () => navigate('/register')
    const naviagteToProducts = () => navigate('/')
    return {naviagteToLogin, naviagteToRegister, naviagteToProducts}
}

export default useNavigateToPages