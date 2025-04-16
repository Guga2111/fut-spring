import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PeladasGrid from "./components/PeladasGrid";
import { useEffect, useState } from "react";
import SignUpPage from "./components/SignUpPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [peladas, setPeladas] = useState([]);

  const api = axios.create({
    baseURL: "http://localhost:8080", // URL do backend
  });

  const getPeladas = async (filters) => {
    const response = await api.get("/pelada", { params: filters });
    setPeladas(response.data);
  };

  useEffect(() => {
    getPeladas();
  }, []);

  return (
    <div className="App">
      <Header></Header>

      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<PeladasGrid peladas={peladas}></PeladasGrid>}
          ></Route>
          <Route path="/Login" element={<SignUpPage></SignUpPage>}></Route>
        </Routes>
      </Router>

      <Footer></Footer>
    </div>
  );
}

export default App;
