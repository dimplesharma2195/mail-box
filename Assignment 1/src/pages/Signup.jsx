import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { auth, createUserWithEmailAndPassword } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User has successfully signed up");
      navigate("/login");
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
        <h2 className="text-center mb-4">SignUp</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#000" }}>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: "#000" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#000" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ color: "#000" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#000" }}>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ color: "#000" }}
            />
          </Form.Group>

          <Button
            variant="warning"
            type="submit"
            className="w-100"
            style={{ color: "#000", fontWeight: "bold" }}
          >
            Sign up
          </Button>
        </Form>

        <div className="mt-3 text-center">
          <p style={{ color: "#000" }}>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default Signup;