import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Insurance Policy</Navbar.Brand>
          <Nav className="me-auto">
          <Navbar.Brand href="user">User</Navbar.Brand>
            <Nav.Link href="/policy">Policy</Nav.Link>
            <Nav.Link href="/user-policy">User Policy</Nav.Link>
            <Nav.Link href="/claim">Claim Settlement</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;