import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Social from "../social/Social";

export default function NavBar() {
  return (
    <Navbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          href="#home"
          style={{
            textTransform: "uppercase",
            fontWeight: "800",
          }}
        >
          RecoverWorld
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>

            <NavDropdown title="Shop" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/vinyl">
                Vinyl
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/digital">
                MP3 / WAV / AAC
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
        <Social />
      </Container>
    </Navbar>
  );
}
