import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    if (!loginEmail || !loginPassword) {
      setLoginError("All fields are required!");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("authToken", token);
      navigate("/mailbox");
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");
    if (!signupEmail || !signupPassword || !signupConfirmPassword) {
      setSignupError("All fields are required!");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      console.log("User has successfully signed up");
      setActivePage("login");
    } catch (err) {
      setSignupError(err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <Card className="p-4 shadow" style={{ width: "400px", color: "#000" }}>
        {activePage === "login" ? (
          <>
            {loginError && <Alert variant="danger">{loginError}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#000" }}>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} style={{ color: "#000" }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#000" }}>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} style={{ color: "#000" }} />
              </Form.Group>
              <Button variant="warning" type="submit" className="w-100" style={{ color: "#000", fontWeight: "bold" }}>
                Login
              </Button>
            </Form>
            <div className="mt-3 text-center">
              <span style={{ color: "#000" }}>Don't have an account? </span>
              <Button variant="link" onClick={() => setActivePage("signup")} style={{ color: "blue", textDecoration: "underline", padding: 0 }}>
                Signup
              </Button>
            </div>
          </>
        ) : (
          <>
            {signupError && <Alert variant="danger">{signupError}</Alert>}
            <Form onSubmit={handleSignup}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#000" }}>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} style={{ color: "#000" }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#000" }}>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} style={{ color: "#000" }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#000" }}>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} style={{ color: "#000" }} />
              </Form.Group>
              <Button variant="warning" type="submit" className="w-100" style={{ color: "#000", fontWeight: "bold" }}>
                Signup
              </Button>
            </Form>
            <div className="mt-3 text-center">
              <span style={{ color: "#000" }}>Already have an account? </span>
              <Button variant="link" onClick={() => setActivePage("login")} style={{ color: "blue", textDecoration: "underline", padding: 0 }}>
                Login
              </Button>
            </div>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Auth;