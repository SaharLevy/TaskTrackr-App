import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "C:/Full Stack Projects/TaskTrackr-App/frontend/src/styles/CenterTheNavbar.css";
import { Link } from "react-router-dom";

const MainNavBar = () => {
  return (
    <Navbar data-bs-theme="light">
      <Container className="d-flex justify-content-center border-bottom ps-0 pe-0">
        <Navbar.Brand href="#home">TaskTrackr</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/tasks">Home</Nav.Link>
          <Link to={"/tasks"} style={{ textDecoration: "none" }}>
            <Nav.Link>Test</Nav.Link>
          </Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavBar;
