import React, { useEffect, useState } from "react";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import PeladaGrid from "./components/component/Pelada/PeladaGrid";
import Footer from "./components/component/Footer";

import SignUpPage from "./components/component/SignUpPage";
import NavigationBar from "./components/component/NavigationBar";
import StatsGrid from "./components/component/PersonalArea/StatsGrid";
import LandingPage from "./components/component/LandingPage/LandingPage";
import PeladaArea from "./components/component/Pelada/PeladaArea";

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import PersonalArea from "./components/component/PersonalArea/PersonalArea";
import DailyArea from "./components/component/Daily/DailyArea";
import axiosInstance from "./api/axiosInstance";

function App() {
  const [peladas, setPeladas] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedPelada, setSelectedPelada] = useState(null);
  const [selectedDaily, setSelectedDaily] = useState(null);

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const getPeladas = async (filters) => {
    try {
      const response = await axiosInstance.get("/pelada", { params: filters });

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

  const handleDailySelect = (daily) => {
    setSelectedDaily(daily);
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        console.error("No JWT token found");
        return;
      }

      const decoded = jwtDecode(token);
      const email = decoded.sub;

      const userResponse = await axiosInstance.get("/user", {
        params: { email },
      });

      const userStats = userResponse.data.stats;

      setUser(userResponse.data);

      setStats(userStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    getUser();
    getPeladas();
  }, [token]);

  const isAuthenticated = () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      return false;
    }
    try {
      const decodedToken = jwtDecode(token);
      const hasUserRole = decodedToken.roles && decodedToken.roles.includes("ROLE_USER");

      return hasUserRole;
    } catch (error) {

      console.error("Invalid token:", error);
      return false;
    }
  };

 return (
    <div className="!font-[system-ui,Avenir,Helvetica,Arial,sans-serif] min-h-screen flex flex-col scrollbar-custom">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
  path="/home"
  element={
    isAuthenticated() ? (
      <div className="flex flex-col flex-grow !bg-gray-50">
        <div className="m-2 font-semibold !bg-gray-50">
          <NavigationBar user={user} />
        </div>
        <h1 className="font-extrabold text-center">FutSpring</h1>
        <div className="flex-grow">
          <PeladaGrid
            peladas={peladas}
            onPeladaCreated={handlePeladaCreated}
            onPeladaSelect={handlePeladaSelect}
          />
        </div>
      </div>
    ) : (
      <Navigate to="/register" replace />
    )
  }
/>
          <Route
            path="/register"
            element={
              <>
                
                <SignUpPage onLogin={setToken} />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated() ? (
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
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />
          <Route
            path="/pelada/:id"
            element={
              isAuthenticated() ? (
                <>
                  <div className="m-2 font-semibold">
                    <NavigationBar user={user} />
                  </div>
                  <div className="!bg-gray-50">
                    <PeladaArea
                      pelada={selectedPelada}
                      user={user}
                      onDailySelect={handleDailySelect}
                    ></PeladaArea>
                  </div>
                </>
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />
          <Route
  path="/daily/:id"
  element={
    isAuthenticated() ? (
      <div className="flex flex-col flex-grow !bg-gray-50">
        <div className="m-2 font-semibold !bg-gray-50">
          <NavigationBar user={user} />
        </div>
        <div className="flex-grow">
          <DailyArea />
        </div>
      </div>
    ) : (
      <Navigate to="/register" replace />
    )
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
