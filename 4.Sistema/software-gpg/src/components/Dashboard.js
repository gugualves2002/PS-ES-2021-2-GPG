import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.pushState("/login");
    } catch {
      setError("Falha em sair");
    }
  }
  return (
    <>
      <h1 className="text-center mb-3">GPG</h1>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Perfil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link
            to="/task"
            style={{ textDecoration: "none" }}
            className="btn btn-primary w-100 mt-3"
          >
            Criar uma nova task
          </Link>
          <Link
            to="/tasks"
            style={{ textDecoration: "none" }}
            className="btn btn-primary w-100 mt-3"
          >
            Abrir painel
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button
          style={{ textDecoration: "none" }}
          variant="link"
          onClick={handleLogout}
        >
          Sair da conta
        </Button>
      </div>
    </>
  );
}
