import { Container, Navbar, NavDropdown, Nav, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          href="/"
          style={{
            textTransform: "uppercase",
            fontWeight: "800",
          }}
        >
          RecoverWorld
        </Navbar.Brand>
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ textTransform: "uppercase" }}
        >
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>

            <NavLink as={Link} to="/digital">
              Digital Hub
            </NavLink>

            <NavLink as={Link} to="/merchandise">
              Mechandise
            </NavLink>

            <Nav.Link as={Link} to="/demos">
              Demos
            </Nav.Link>

            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
