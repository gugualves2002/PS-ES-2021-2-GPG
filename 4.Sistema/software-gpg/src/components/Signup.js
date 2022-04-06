import React, { useRef, useState } from "react";
import Select from "react-select";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function Signup() {
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const history = useHistory();
  const userCollectionRef = collection(db, "users");

  const roleOptions = [
    { value: "admin", label: "Administrador" },
    { value: "employee", label: "Funcionário" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Senha informada não é idêntica");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await addDoc(userCollectionRef, {
        userName,
        email,
        role,
        author: {
          name: auth.currentUser.email,
          id: auth.currentUser.uid,
        },
      });
      history.push("/login");
    } catch {
      setError("Falha em criar conta");
    }
    setLoading(false);
  }

  return (
    <>
      <h1 className="text-center mb-3">GPG</h1>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Cadastre-se</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                ref={userNameRef}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group className="mb-4" id="password-confirm">
              <Form.Label>Confirme a senha</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Select
              placeholder="Cargo"
              defaultValue={roleOptions}
              options={roleOptions}
              onChange={(newValue) => {
                setRole(newValue.value);
              }}
            />
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Cadastrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Já possui uma conta?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          Entrar
        </Link>
      </div>
    </>
  );
}
