import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "C:/Users/xvrui/Desktop/TaskTrackr/frontend/src/styles/CenterTheNavbar.css";

const MainNavBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container className="d-flex justify-content-center border-bottom ps-0 pe-0">
        <Navbar.Brand href="#home">TaskTrackr</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavBar;
