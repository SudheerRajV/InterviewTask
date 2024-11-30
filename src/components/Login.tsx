import { FC, useState, ChangeEvent, FormEvent } from "react";
import { Card, Button, Form, Container, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppContext } from "../hooks/AppContext";
import { useLogin } from "../hooks/useLogin";
import useNavigateToPages from "../hooks/useNavigateToPages";

const Login: FC = () => {
    const {naviagteToRegister, naviagteToProducts} = useNavigateToPages()
    const { toogleLogout} = useAppContext()
    const [email, setEmail] = useState<string>("");
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    const { data, error, loading, fetchData } = useLogin();


    // Handle input changes
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setEmail(event.target.value)
      setEmailError(event.target.value.length === 0)
    };
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setPassword(event.target.value)
      setPasswordError(event.target.value.length < 8)
    };

    const handleRegistar = (): void => {
      naviagteToRegister()
    };

    const validate = () => {
        if(email.length === 0)
        {
        setEmailError(true)
        return false;
        }
        if(password.length < 8)
        {
        setPasswordError(true)
        return false;
        }
        return true
    }
    // Handle form submission
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      if (validate()) {
        console.log('handleSubmit',email, password)
        fetchData(email, password)
        if(data && !loading){
        toogleLogout()
        naviagteToProducts()
        }else if(error){
          console.log('error', error)
        }
      }
    };

    return (

      <Container className="container-full-height d-flex align-items-center justify-content-center">

        {/* React-Bootstrap Card */}
        <Card className="shadow w-50">
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  isInvalid = {isEmailError}
                  required
                />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  isInvalid = {isPasswordError}
                  required
                />
                <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
              {(loading)? (
                <>
                <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />Loading...</>): ("Submit")}
            </Button>
            <Button variant="primary" className="mx-2" onClick={handleRegistar}>Registar</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  };

export default Login