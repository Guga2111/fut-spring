import React, {useEffect,useState} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios";
import './App.css'
import { jwtDecode } from "jwt-decode";
import PeladaGrid from './components/component/PeladaGrid';
import Footer from './components/component/Footer';
import Profile from './components/component/Profile';
import SignUpPage from './components/component/SignUpPage';
import NavigationBar from './components/component/NavigationBar';
import StatsGrid from './components/component/StatsGrid';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {

  const [peladas, setPeladas] = useState([]);
  const [stats, setStats] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:8080", // URL do backend
  });

  const getPeladas = async (filters) => {
    const response = await api.get("/pelada", { params: filters });
    setPeladas(response.data);
  };

  const getStats = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No JWT token found");
        return;
      }
  
      const decoded = jwtDecode(token);
      const email = decoded.sub;
  
      // Add the token to authorization header
      const userResponse = await api.get("/user", { 
        params: {email},
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Stats response:", userResponse.data);
  
      const userStats = userResponse.data.stats;
      setStats(userStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }

  useEffect(() => {
    getPeladas();
    getStats();
  }, []);

  return (
    <>
    <div className="font-mono min-h-screen flex flex-col">
      <div className='m-2'>
        <NavigationBar></NavigationBar>
      </div>
        <h1>FutSpring</h1>

      <Router>
        <Routes>
          <Route path='/' element={<div className='flex-grow'>
        <PeladaGrid peladas={peladas}></PeladaGrid>
      </div>}>

          </Route>
          <Route path='/register' element={<SignUpPage></SignUpPage>}>

          </Route>

          <Route path='/stats' element={<StatsGrid stats={stats}></StatsGrid>}>

          </Route>
        </Routes>  
      </Router>  
      
  
        <Footer></Footer>
      
    </div>
    </>
  )
}

export default App
