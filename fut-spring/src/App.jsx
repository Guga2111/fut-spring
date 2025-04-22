import React, {useEffect,useState} from 'react'
import axios from "axios";
import './App.css'
import PeladaGrid from './components/component/PeladaGrid';

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
    <>
      <div>
        <PeladaGrid peladas={peladas}></PeladaGrid>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
