

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [countryRowId, setCountryRowId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [referralId, setReferralId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch("https://lobster-app-ddwng.ondigitalocean.app/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api_key": "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH"
      },
      body: JSON.stringify({
        full_name: fullName,
        username: username,
        email_id: emailId,
        country_row_id: countryRowId,
        mobile_number: mobileNumber,
        password: password
      })
      });
      const data = await response.json();
      if (response.ok && data.status !== false) {
      setSuccess("Registration successful! Redirecting to login...");
      setModalTitle("Success");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/login");
      }, 1500);
      } else {
      let errorMsg = "Registration failed";
      if (data.message && typeof data.message === "object") {
        // Convert object to string for display
        errorMsg = Object.values(data.message).join(", ");
      } else if (data.message) {
        errorMsg = data.message;
      }
      setError(errorMsg);
      setModalTitle("Registration Error");
      setShowModal(true);
      }
    } catch (err) {
      setError(err.message || "Network error");
      setModalTitle("Network Error");
      setShowModal(true);
    }
    };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="register-container">
      <div className="form-title">Register</div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="form-label">Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          required
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUserName">
        <Form.Label className="form-label">User Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter User Name"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Label className="form-label">Country</Form.Label>
        <Form.Select
          value={countryRowId}
          onChange={e => setCountryRowId(e.target.value)}
          required
        >
          <option value="">Select Country</option>
          <option value="101">India</option>
          <option value="102">USA</option>
          <option value="103">UK</option>
        </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label className="form-label">Mobile number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter Phone Number"
          value={mobileNumber}
          onChange={e => setMobileNumber(e.target.value)}
          required
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="form-label">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={emailId}
          onChange={e => setEmailId(e.target.value)}
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
        <Form.Group className="mb-3" controlId="formBasicReferenceId">
        <Form.Label className="form-label">Referral Id <span style={{color: "#888"}}>(optional)</span></Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Referral Id"
          value={referralId}
          onChange={e => setReferralId(e.target.value)}
        />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mb-2">
        Register
        </Button>
      </Form>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
        <span className="text-black mt-1">Already have an account? </span>
        <Button variant="link" onClick={() => navigate("/login")} style={{ paddingLeft: 4 }}>
        Login
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {error || success}
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