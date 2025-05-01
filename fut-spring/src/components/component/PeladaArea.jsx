import React, {useEffect, useState} from "react";
import DailyCard from "./DailyCard";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ViewPeladaPlayersDialog from "./ViewPeladaPlayersDialog";

export default function PeladaArea({pelada}) {

    const { id } = useParams();
    const [peladaData, setPeladaData] = useState(pelada);
    const [loading, setLoading] = useState(!pelada);
    const [playersAssociated, setPlayersAssociated] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);

    useEffect(() => {
        if (!peladaData && id) {
          const fetchPelada = async () => {
            try {
              const response = await axios.get(`http://localhost:8080/pelada/${id}`);
              setPeladaData(response.data);
              setLoading(false);
            } catch (error) {
              console.error("Error fetching pelada details:", error);
              setLoading(false);
            }
          };
          
          fetchPelada();
        } else if (peladaData) {
          setLoading(false);
        }
      }, [peladaData, id]);

      useEffect(() => {
        const fetchPlayers = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:8080/pelada/${id}/user`);
                    setPlayersAssociated(response.data);
                    setLoadingPlayers(false);
                } catch (error) {
                    console.error("Error fetching players:", error);
                    setLoadingPlayers(false);
                }
            }
        };
        
        fetchPlayers();
    }, [id]);
      
      if (loading) return <div>Loading...</div>;
      if (!peladaData) return <div>Pelada not found</div>;

    return(
        <div>
            <div>
                <h1 className="font-extrabold">{peladaData.name}</h1>
            </div>
            <div className="py-55">
                <div className="Central Area ">
                    <DailyCard pelada={peladaData}></DailyCard>
                </div>
                <div className="Chat Area">

                </div>
                <div className="Ranking Area">

                </div>
                <div className="Players Area mt-48">
                    <ViewPeladaPlayersDialog isLoading={loadingPlayers} playersAssociated={playersAssociated}></ViewPeladaPlayersDialog>
                </div>
            </div>
            
        </div>
    )
}