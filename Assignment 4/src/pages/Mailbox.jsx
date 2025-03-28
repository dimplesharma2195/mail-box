import React from "react";
import { Container, Card } from "react-bootstrap";

const Mailbox = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Card className="p-4 shadow text-center" style={{ width: "400px", color: "#000" }}>
        <h2>Welcome to your mail box</h2>
      </Card>
    </Container>
  );
};

export default Mailbox;