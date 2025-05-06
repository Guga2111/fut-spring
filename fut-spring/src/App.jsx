import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import PeladaGrid from "./components/component/PeladaGrid";
import Footer from "./components/component/Footer";
import Profile from "./components/component/Profile";
import SignUpPage from "./components/component/SignUpPage";
import NavigationBar from "./components/component/NavigationBar";
import StatsGrid from "./components/component/StatsGrid";
import LandingPage from "./components/component/LandingPage";
import PeladaArea from "./components/component/PeladaArea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  const [peladas, setPeladas] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedPelada, setSelectedPelada] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:8080", 
  });

  const getPeladas = async (filters) => {
    try {
      const response = await api.get("/pelada", { params: filters });
      console.log("Fetched peladas:", response.data);
      setPeladas(response.data);
    } catch (error) {
      console.error("Error fetching peladas:", error);
    }
  };

  const handlePeladaCreated = (newPelada) => {
    console.log("New pelada created:", newPelada);
    setPeladas((prevPeladas) => [...prevPeladas, newPelada]);
  };

  const handlePeladaSelect = (pelada) => {
    setSelectedPelada(pelada);
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

      const userResponse = await api.get("/user", {
        params: { email },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Stats response:", userResponse.data);

      const userStats = userResponse.data.stats;
      setStats(userStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    getPeladas();
    getStats();
  }, []);

  return (
    <div className="font-mono min-h-screen flex flex-col">

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <>
                <div className="m-2 font-semibold">
                  <NavigationBar />
                </div>
                <h1 className="font-extrabold">FutSpring</h1>
                <div className="flex-grow">
                  <PeladaGrid
                    peladas={peladas}
                    onPeladaCreated={handlePeladaCreated}
                    onPeladaSelect={handlePeladaSelect}
                  />
                </div>
              </>
            }
          />
          <Route path="/register" element={<>
            <h1 className="font-extrabold">FutSpring</h1>
            <SignUpPage />
          </>} />
          <Route
            path="/stats"
            element={
              <>
                <div className="m-2 font-semibold">
                  <NavigationBar />
                </div>
                <h1 className="font-extrabold">FutSpring</h1>
                <div>
                  <StatsGrid stats={stats} />
                </div>
              </>
            }
          />
          <Route
            path="/pelada/:id"
            element={
              <>
                <div className="m-2 font-semibold">
                  <NavigationBar />
                </div>
                <div>
                  <PeladaArea pelada={selectedPelada}></PeladaArea>
                </div>
              </>
            }
          />
        </Routes>
        <Footer />
      </Router>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
