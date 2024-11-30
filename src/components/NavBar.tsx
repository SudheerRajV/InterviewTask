import {FC} from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo  from "../logo.svg";
import { useAppContext } from '../hooks/AppContext';
import { removeToken } from '../service/StorageService';
import useNavigateToPages from '../hooks/useNavigateToPages';


const NavBar: FC = () => {
    const {isLoggedIn, toogleLogout} = useAppContext()
    const {naviagteToLogin} = useNavigateToPages()
    const handleLogout = () =>{
        removeToken()
        toogleLogout()
        naviagteToLogin()
    }
  return (
    <>
    <Navbar expand="lg" bg="dark">
        <Container>
          <Navbar.Brand href="#"><img src={logo} alt='logo'
              width="50"
              height="50"
              className="d-inline-block align-top"/></Navbar.Brand>
        { isLoggedIn && <Button className="justify-content-end" variant="outline-light" onClick={handleLogout}>
            Logout
        </Button>}
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar