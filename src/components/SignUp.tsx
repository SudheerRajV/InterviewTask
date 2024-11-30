import { FC, useState, ChangeEvent, FormEvent } from "react";
import { Card, Button, Form, Container, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSignUp } from "../hooks/useSignUp";
import useNavigateToPages from "../hooks/useNavigateToPages";

const SignUp: FC = () => {
    const {naviagteToLogin} = useNavigateToPages()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [email, setEmail] = useState<string>("");
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>("");
    const [isFirstNameError, setFirstNameError] = useState<boolean>(false);
    const [lastName, setLastName] = useState<string>("");
    const { data, error, loading, fetchData } = useSignUp()


    // Handle input changes
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setEmail(event.target.value)
      setEmailError(email.length === 0 || !emailRegex.test(email))
    };
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setPassword(event.target.value)
      setPasswordError(event.target.value.length < 8)
    };

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setFirstName(event.target.value)
        setFirstNameError(event.target.value.length === 0)
      };

      const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLastName(event.target.value)
      };

    const validate = () => {
        if(firstName.length === 0)
        {
        setFirstNameError(true)
        return false;
        }
        if(email.length === 0 || !emailRegex.test(email))
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
        //console.log('handleSubmit',email, password)
        fetchData(email, password, firstName, lastName)
        if(data && !error && !loading){
            handleLogin()
        }else if(error){
            console.log('error', error)
          }
      }
    };

    const handleLogin = (): void => {
      naviagteToLogin()
      };

    return (

      <Container className="container-full-height d-flex align-items-center justify-content-center">

        {/* React-Bootstrap Card */}
        <Card className="shadow w-50">
          <Card.Body>
            <Card.Title>Registar</Card.Title>
            <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  isInvalid = {isFirstNameError}
                  required
                />
              <Form.Control.Feedback type="invalid">
                Please provide a valid first name.
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Form.Group>
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
            <Button variant="primary" className="mx-2" onClick={handleLogin}>Login</Button>
            </Form>
          </Card.Body>
        </Card>
        {/* {error && <Notify message= "Something went wrong"/>} */}
      </Container>
    );
  };

export default SignUp