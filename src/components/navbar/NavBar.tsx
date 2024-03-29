import { NavDropdown, Navbar, Nav, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import css from "./NavBar.module.css";

interface INavBar {
  isAdmin: boolean;
  labels: string[];
}

export default function NavBar({ isAdmin, labels }: INavBar) {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="lg"
      variant="dark"
      collapseOnSelect
      className={css["no-transition"]}
    >
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
        <Nav className={css["no-transition"]}>
          <Nav.Link as={Link} to="/about" eventKey="1">
            About
          </Nav.Link>

          <NavDropdown title="Digital" id="navbarScrollingDropdown">
            <NavDropdown.Item
              onClick={(e) => navigate("/digital/new")}
              style={{ textTransform: "capitalize" }}
            >
              New Releases
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {labels?.map((label, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={(e) => navigate(`/digital/label/${label}`)}
                  style={{ textTransform: "capitalize" }}
                  eventKey={5 + index}
                >
                  {label}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>

          <NavLink
            eventKey="2"
            href="https://store.recoverworld.com"
            target="_blank"
            rel="noreferrer"
          >
            MP3/WAV
          </NavLink>

          <NavLink as={Link} to="/merchandise" eventKey="3">
            Merchandise
          </NavLink>

          <Nav.Link as={Link} to="/demos" eventKey="4">
            Demos
          </Nav.Link>

          <Nav.Link
            href="https://chrishampshire.co.uk"
            target="_blank"
            eventKey="5"
          >
            CHRIS HAMPSHIRE
          </Nav.Link>

          <Nav.Link as={Link} to="/mastering" eventKey="6">
            Mastering
          </Nav.Link>

          <Nav.Link as={Link} to="/studio" eventKey="7">
            Studio
          </Nav.Link>

          <Nav.Link as={Link} to="/contact" eventKey="8">
            Contact
          </Nav.Link>

          {isAdmin && (
            <Nav.Link as={Link} to="/admin" eventKey="5">
              Admin
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
