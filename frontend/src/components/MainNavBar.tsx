import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/CenterTheNavbar.module.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const MainNavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <Navbar data-bs-theme="light">
      <Container className="d-flex justify-content-center border-bottom ps-0 pe-0">
        <Link to="/" className="navbar-brand">
          TaskTrackr
        </Link>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/account">
            Account
          </Nav.Link>
          {user && (
            <button
              className="btn btn-outline-success btn-sm"
              onClick={handleClick}
            >
              Log out
            </button>
          )}
          {!user && (
            <>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavBar;
