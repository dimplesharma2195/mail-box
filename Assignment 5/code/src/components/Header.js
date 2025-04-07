import React from 'react';
import { Navbar, Nav, Button, Badge } from 'react-bootstrap';
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: 'goldenrod' }} className="px-3">
      <Navbar.Brand 
        as={Link} 
        to="/mailbox" 
        style={{ color: 'black', fontWeight: 'bold', marginLeft: '1rem' }}
      >
        <FaEnvelope style={{ marginRight: '8px' }} />
        Mailbox
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Button 
            as={Link} 
            to="/inbox" 
            style={{ 
              backgroundColor: 'white', 
              color: 'black', 
              fontWeight: 'bold', 
              borderRadius: '50px',
              border: 'none',
              marginRight: '8px'
            }}
          >
            Inbox <Badge bg="secondary">0</Badge>
          </Button>
          <Button 
            as={Link} 
            to="/outbox"
            style={{ 
              backgroundColor: 'white', 
              color: 'black', 
              fontWeight: 'bold', 
              borderRadius: '50px',
              border: 'none'
            }}
          >
            Outbox <Badge bg="secondary">0</Badge>
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;