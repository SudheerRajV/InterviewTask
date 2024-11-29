import { FC } from "react";
import { Container, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { AppProvider } from "./hooks/AppContext";




const App: FC = () => {
  return (
      <AppProvider>
      <Stack className="container-full-height">
        <NavBar />
        <Container className="container-full-height d-flex align-items-center justify-content-center">
          <Outlet />
        </Container>
      </Stack>
      </AppProvider>
  );
};

export default App;
