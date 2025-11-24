import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("https://lobster-app-ddwng.ondigitalocean.app/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api_key": "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH"
        },
        body: JSON.stringify({
          login_id: loginId,
          password: password
        })
      });
      const data = await response.json();
      if (response.ok && data.status !== false) {
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        setError(data.message?.alert_message || "Login failed");
        setShowModal(true);
      }
    } catch (err) {
      setError("Network error");
      setShowModal(true);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="col-md-5 col-lg-4 p-4 shadow rounded bg-white">
        <div className="form-title">Login</div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={loginId}
              onChange={e => setLoginId(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mb-2">
            Log In
          </Button>
        </Form>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
          <span className="text-black">New user? </span>
          <Button variant="link" onClick={() => navigate("/register")} style={{ paddingLeft: 4 }}>
            Register
          </Button>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
