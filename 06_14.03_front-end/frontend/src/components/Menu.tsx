import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Menu() {
  const { t, i18n } = useTranslation();
  // const [htmliMinevMuutuja, funktsioonMisMuudabSedaMuutujat] = useState(algväärtus);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Decathlon
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Admin" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/sportlased">
                Manage sportlased
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/tulemused">
                Manage tulemused
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/">
              Sportlased
            </Nav.Link>
            <Nav.Link as={Link} to="/tulemused">
              Tulemused
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
