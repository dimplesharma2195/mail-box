import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Header from '../components/Header';
import ComposeMail from './ComposeMail';

const HomePage = () => {
  const [showCompose, setShowCompose] = useState(false);

  return (
    <>
      <Header />
      <Container className="d-flex flex-column align-items-center mt-4">
        <Button 
          style={{ 
            backgroundColor: 'goldenrod', 
            color: 'black', 
            fontWeight: 'bold', 
            border: 'none', 
            borderRadius: '5px' 
          }}
          size="lg"
          onClick={() => setShowCompose(true)}
        >
          Add Compose
        </Button>

        {showCompose && (
          <ComposeMail onClose={() => setShowCompose(false)} />
        )}
      </Container>
    </>
  );
};

export default HomePage;