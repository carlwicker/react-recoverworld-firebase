import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
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

            <NavDropdown title="Shop" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/vinyl">
                Vinyl
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/digital">
                Digital Hub
              </NavDropdown.Item>
            </NavDropdown>
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
