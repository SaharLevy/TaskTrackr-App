import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const MainNavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <Navbar className="navbar-transparent">
      <Container className={`${styles.ContainerStyle} px-0`}>
        {/* Left section */}
        <Navbar.Brand as={Link} to="/">
          TaskTrackr
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/account">
            Account
          </Nav.Link>
        </Nav>

        {/* Right section */}
        <Nav className="ms-auto">
          {user ? (
            <Nav.Link as={Link} to="/login" onClick={handleClick}>
              Log out
            </Nav.Link>
          ) : (
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
