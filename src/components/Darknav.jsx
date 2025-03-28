import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Darknav() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container className="nav">
        <Navbar.Brand href="/">weSellCraps</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/detail">Detail</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/cart">Cart</Nav.Link>
          <Nav className="ms-auto">
            {result.isLoding ? "로딩중" : result.data.name}
          </Nav>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Darknav;
