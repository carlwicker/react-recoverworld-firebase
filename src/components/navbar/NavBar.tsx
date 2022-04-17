import { Container, Navbar, NavDropdown, Nav, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import css from "./NavBar.module.css";

export default function NavBar() {
  const isAdmin: boolean = false;
  return (
    <Navbar expand="md" variant="dark" collapseOnSelect>
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

        <Navbar.Toggle
          // aria-controls="basic-navbar-nav"
          style={{
            border: "none",
            outline: "none",
          }}
          className={css["nav-hamburger"]}
        />

        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{
            border: "none",
            outline: "none",
            textTransform: "uppercase",
          }}
          className={css["no-transition"]}
        >
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about" eventKey="1">
              About
            </Nav.Link>

            <NavLink as={Link} to="/digital" eventKey="2">
              Digital Hub
            </NavLink>

            <NavLink as={Link} to="/merchandise" eventKey="3">
              Merchandise
            </NavLink>

            <Nav.Link as={Link} to="/demos" eventKey="4">
              Demos
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" eventKey="5">
              Contact
            </Nav.Link>

            {isAdmin ? (
              <NavDropdown title="AMPSuite Tools" id="ampsuiteTools">
                <NavDropdown.Item
                  as={Link}
                  to="/ampsuite/release/import"
                  eventKey="6"
                >
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
