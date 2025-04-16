import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    stars: 1,
  });

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegisterRequest = async (e) => {
    e.preventDefault();
    const endpoint = "http://localhost:8080/user/register";

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponseData(response.data);
      setError(null);
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error in the request: " + error);
      setError("Ocurred an error when trying to register a user.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Registro de Usuário</h1>
      <form onSubmit={handleRegisterRequest} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stars">Estrelas:</label>
          <input
            type="number"
            id="stars"
            name="stars"
            value={formData.stars}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Registrar
        </button>
      </form>
      {responseData && (
        <div className="response-container">
          <h3>Resposta do Servidor:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div className="error-container">
          <h3>Erro:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
