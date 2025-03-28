import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("authToken", token);
      navigate("/mailbox");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Card className="p-4 shadow" style={{ width: "400px", color: "#000" }}>
        <h2 className="text-center mb-4" style={{ color: "#000" }}>Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#000" }}>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: "#000" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#000" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ color: "#000" }}
            />
          </Form.Group>

          <Button
            variant="warning"
            type="submit"
            className="w-100"
            style={{ color: "#000", fontWeight: "bold" }}
          >
            Login
          </Button>
        </Form>

        <div className="mt-3 text-center">
          <p style={{ color: "#000" }}>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default Login;