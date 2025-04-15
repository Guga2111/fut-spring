import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PeladasGrid from "./components/PeladasGrid";
import { useEffect, useState } from "react";

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
      <PeladasGrid peladas={peladas}></PeladasGrid>
      <Footer></Footer>
    </div>
  );
}

export default App;
