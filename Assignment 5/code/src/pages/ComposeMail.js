import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { FaPaperclip, FaLink, FaSmile, FaBold, FaTimes, FaTrash, FaImage } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ComposeMail = ({ onClose }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");

  const handleSend = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(contentState));
    const mailData = { to, cc, subject, content: rawContent };
    console.log("Sending mail:", mailData);
  };

  const handleDelete = () => {
    console.log("Mail deleted");
    onClose();
  };

  return (
    <Container
      fluid
      className="p-4 mt-4"
      style={{
        maxWidth: "900px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        position: "relative",
        background: "#fff",
      }}
    >
      <Button
        variant="light"
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: "none",
          background: "transparent",
          fontSize: "1.2rem",
        }}
      >
        <FaTimes />
      </Button>
      <Row className="mb-2">
        <Col xs={12} md={8} className="mb-2 mb-md-0">
          <InputGroup>
            <FormControl
              type="email"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              style={{ border: "none", borderBottom: "1px solid #ccc" }}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={4}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Cc / Bcc"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              style={{ border: "none", borderBottom: "1px solid #ccc" }}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{
              border: "none",
              borderBottom: "1px solid #ccc",
              borderRadius: 0,
            }}
          />
        </Col>
      </Row>
      <Row style={{ minHeight: "300px" }} className="mb-2">
        <Col>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperStyle={{
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "4px",
              minHeight: "250px",
            }}
            editorStyle={{ minHeight: "200px" }}
            toolbar={{
              options: ["inline", "blockType", "list", "textAlign", "history"],
              inline: { options: ["bold", "italic", "underline", "strikethrough"] },
              blockType: { inDropdown: true },
            }}
          />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col xs="auto">
          <Button
            variant="primary"
            style={{
              backgroundColor: "#1a73e8",
              borderColor: "#1a73e8",
              borderRadius: "20px",
              padding: "6px 20px",
            }}
            onClick={handleSend}
          >
            Send
          </Button>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <FaPaperclip style={{ marginRight: "20px", cursor: "pointer" }} />
          <FaLink style={{ marginRight: "20px", cursor: "pointer" }} />
          <FaImage style={{ marginRight: "20px", cursor: "pointer" }} />
          <FaSmile style={{ marginRight: "20px", cursor: "pointer" }} />
          <FaBold style={{ marginRight: "20px", cursor: "pointer" }} />
          <BiDotsHorizontalRounded style={{ marginRight: "20px", cursor: "pointer" }} />
        </Col>
        <Col className="d-flex justify-content-end">
          <FaTrash style={{ cursor: "pointer" }} onClick={handleDelete} />
        </Col>
      </Row>
    </Container>
  );
};

export default ComposeMail;