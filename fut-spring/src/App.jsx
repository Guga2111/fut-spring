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
import PersonalArea from "./components/component/PersonalArea";

function App() {
  const [peladas, setPeladas] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedPelada, setSelectedPelada] = useState(null);

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:8080",
  });

  const getPeladas = async (filters) => {
    try {
      const response = await api.get("/pelada", { params: filters });

      setPeladas(response.data);
    } catch (error) {
      console.error("Error fetching peladas:", error);
    }
  };

  const handlePeladaCreated = (newPelada) => {
    setPeladas((prevPeladas) => [...prevPeladas, newPelada]);
  };

  const handlePeladaSelect = (pelada) => {
    setSelectedPelada(pelada);
  };

  const getUser = async () => {
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

      const userStats = userResponse.data.stats;

      setUser(userResponse.data);

      setStats(userStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    getPeladas();
    getUser();
  }, [token]);

  return (
    <div className="!font-[system-ui,Avenir,Helvetica,Arial,sans-serif] min-h-screen flex flex-col scrollbar-custom">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <>
                <div className="m-2 font-semibold">
                  <NavigationBar user={user} />
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
          <Route
            path="/register"
            element={
              <>
                <h1 className="font-extrabold">FutSpring</h1>
                <SignUpPage onLogin={setToken} />
              </>
            }
          />
          <Route
            path="/stats"
            element={
              <>
                <div className="m-0 font-semibold">
                  <NavigationBar user={user} />
                </div>
                <div className="mb-20">
                  <PersonalArea user={user}></PersonalArea>
                </div>
                <div>
                  <StatsGrid user={user} />
                </div>
              </>
            }
          />
          <Route
            path="/pelada/:id"
            element={
              <>
                <div className="m-2 font-semibold">
                  <NavigationBar user={user} />
                </div>
                <div>
                  <PeladaArea pelada={selectedPelada} user={user}></PeladaArea>
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
