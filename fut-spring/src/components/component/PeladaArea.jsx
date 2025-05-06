import React, {useEffect, useState} from "react";
import DailyCard from "./DailyCard";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ViewPeladaPlayersDialog from "./ViewPeladaPlayersDialog";
import { Progress } from "@/components/ui/progress"
import RankingGrid from "./RankingGrid";


export default function PeladaArea({pelada}) {

    const { id } = useParams();
    const [peladaData, setPeladaData] = useState(pelada);
    const [loading, setLoading] = useState(!pelada);
    const [playersAssociated, setPlayersAssociated] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const [ranking, setRanking] = useState([]);

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

    useEffect(() => {
      const fetchRanking = async () => {
        try{
          const response = await axios.get(`http://localhost:8080/ranking/${id}`);
          setRanking(response.data);
        } catch (error) {
          console.error("Error fetching ranking: ", error);
        }
      };

      fetchRanking();
    }, [id])
      
      if (loading) return <div><Progress value={33} /></div>;
      if (!peladaData) return <div>Pelada not found</div>;

    return(
<div>
  <h1 className="font-extrabold text-center">{peladaData.name}</h1>

  <div className="py-15 flex justify-center items-start gap-20">

    
    <div className="w-1/4 Chat Area border rounded p-4 py-16">
     
    </div>

    
    <div className="w-1/2 h-screen flex flex-col justify-between items-center">
      <div className="w-full">
        <DailyCard pelada={peladaData} />
      </div>
      <div className="w-full">
        <ViewPeladaPlayersDialog
          isLoading={loadingPlayers}
          playersAssociated={playersAssociated}
        />
      </div>
    </div>

    <div className="w-1/4 border rounded p-4 ">
      <RankingGrid ranking={ranking} associatedPlayers={playersAssociated}/>
    </div>

  </div>
</div>

    )
}