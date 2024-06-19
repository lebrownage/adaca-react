import './assets/css/main.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'; 
import { Container, Navbar, Nav, Col, Row } from 'react-bootstrap';
import Test from './pages/Examples'

function App() {
  
  return (
    <Router>
      <Container fluid>
      <Row className='p-0'>
      <Col xs={12} id="nav-content-wrapper p-0" fixed="top">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">My Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              </Nav> */}
            </Navbar.Collapse>
          </Navbar>
          
        </Col>
        <Col xs={1} className="sidebar-wrapper ">
          <Nav className="d-block">
            <Nav.Item>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={11} className='mt-2 mb-2'>
          <Routes>
            <Route path="/" element={<Test />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>
  )
}

export default App
