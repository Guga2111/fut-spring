import React, { useState } from "react";
import "./SignUpPage.css"; // Importa o CSS separado

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    stars: 1, // Adicionado o campo "stars"
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia os dados para o backend
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Cadastro realizado com sucesso!");
        setFormData({ username: "", email: "", password: "", stars: 0 }); // Limpa o formulário
      } else {
        setSuccessMessage("Erro ao realizar o cadastro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      setSuccessMessage("Erro ao realizar o cadastro. Tente novamente.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Cadastro</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label className="form-label">Nome</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Senha</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Estrelas</label>
          <input
            type="number"
            name="stars"
            value={formData.stars}
            onChange={handleChange}
            className="form-input"
            min="1"
            max="5"
          />
        </div>

        <button type="submit" className="form-button">
          Cadastrar
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default SignUpPage;
