import React, {useEffect,useState} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
      <div className='m-10'>
      <Avatar className="absolute top-4 right-4 ...">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      </div>
      <div className='pelada-grid'>
        <PeladaGrid peladas={peladas}></PeladaGrid>
      </div>
      <div className='footer'>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </div>
    </div>
    </>
  )
}

export default App
