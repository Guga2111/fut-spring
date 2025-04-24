import React, {useEffect,useState} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios";
import './App.css'
import PeladaGrid from './components/component/PeladaGrid';
import Footer from './components/component/Footer';
import Profile from './components/component/Profile';
import NavigationBar from './components/component/NavigationBar';

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
    <div className="font-mono min-h-screen flex flex-col">
      <div className='m-2'>
        <NavigationBar></NavigationBar>
      </div>
        <h1>FutSpring</h1>
      <div className='flex-grow'>
        <PeladaGrid peladas={peladas}></PeladaGrid>
      </div>
  
        <Footer></Footer>
      
    </div>
    </>
  )
}

export default App
