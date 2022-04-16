import { Container, Navbar, NavDropdown, Nav, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
  const isAdmin: boolean = false;
  return (
    <Navbar expand="md" variant="dark">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand
            style={{
              textTransform: "uppercase",
              fontWeight: "800",
            }}
          >
            RecoverWorld
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ border: "none" }}>
          <Nav
            className="me-auto"
            style={{
              textTransform: "uppercase",
            }}
          >
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>

            <NavLink as={Link} to="/digital">
              Digital Hub
            </NavLink>

            <NavLink as={Link} to="/merchandise">
              Merchandise
            </NavLink>

            <Nav.Link as={Link} to="/demos">
              Demos
            </Nav.Link>

            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>

            {isAdmin ? (
              <NavDropdown title="AMPSuite Tools" id="ampsuiteTools">
                <NavDropdown.Item as={Link} to="/ampsuite/release/import">
                  Import AMPSuite Release
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
