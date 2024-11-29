import {FC} from 'react';
import { Button, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo  from "../logo.svg";
import { useAppContext } from '../hooks/AppContext';
import { useNavigate } from 'react-router-dom';


const NavBar: FC = () => {
    const {isLoggedIn, toogleLogout} = useAppContext()
    const navigate = useNavigate()
    const handleLogout = () =>{
        toogleLogout()
        navigate('/')
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