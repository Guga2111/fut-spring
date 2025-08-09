import React, { useEffect, useState } from "react";
import DailyCard from "../Daily/DailyCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import ViewPeladaPlayersDialog from "./ViewPeladaPlayersDialog";
import { Progress } from "@/components/ui/progress";
import RankingGrid from "./RankingGrid";
import PeladaHeader from "./PeladaHeader";
import PeladaChat from "./PeladaChat";
import ViewDailyHistory from "./ViewDailyHistory";
import { API_BASE_URL } from "../../../config";
import axiosInstance from "../../../api/axiosInstance";

export default function PeladaArea({ pelada, user, onDailySelect }) {
  const { id } = useParams();
  const [peladaData, setPeladaData] = useState(pelada);
  const [loading, setLoading] = useState(!pelada);
  const [playersAssociated, setPlayersAssociated] = useState([]);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [ranking, setRanking] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [dailies, setDailies] = useState([]);

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const resp = await axiosInstance.get(`${API_BASE_URL}/user/images`);
        setAllImages(resp.data);
      } catch (error) {
        console.error("Erro ao buscar allImages:", error);
      } finally {
        setLoadingImages(false);
      }
    };
    fetchAllImages();
  }, []);

  useEffect(() => {
    if (!peladaData && id) {
      const fetchPelada = async () => {
        try {
          const response = await axiosInstance.get(`${API_BASE_URL}/pelada/${id}`);
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
          const response = await axiosInstance.get(
            `${API_BASE_URL}/pelada/${id}/users`
          );
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
      try {
        const response = await axiosInstance.get(`${API_BASE_URL}/ranking/${id}`);
        setRanking(response.data);
      } catch (error) {
        console.error("Error fetching ranking: ", error);
      }
    };

    fetchRanking();
  }, [id]);

  useEffect(() => {
    const fetchDailies = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_BASE_URL}/pelada/${id}/dailies`
        );
        setDailies(response.data);
      } catch (error) {
        console.error("Error fetching dailies: ", error);
      }
    };

    fetchDailies();
  }, [id]);

  if (loading)
    return (
      <div>
        <Progress value={33} />
      </div>
    );
  if (!peladaData) return <div>Pelada not found</div>;

  return (
    <div>
      <div>
        <PeladaHeader peladaData={peladaData}></PeladaHeader>
      </div>

      <div className="py-20 flex justify-center items-start gap-20">
        <div className="w-1/4 Chat Area border rounded-xl p-4 py-16">
          <PeladaChat
            playersAssociated={playersAssociated}
            allImages={allImages}
            peladaId={id}
            user={user}
          ></PeladaChat>
        </div>

        <div className="w-1/2 flex flex-col gap-75 items-center">
          <div className="w-full">
            <DailyCard
              pelada={peladaData}
              onDailySelect={onDailySelect}
              user={user}
            />
          </div>
          <div className="w-full flex justify-center gap-2 mt-4">
            <ViewPeladaPlayersDialog
              isLoading={loadingPlayers}
              playersAssociated={playersAssociated}
              allImages={allImages}
            />
            <ViewDailyHistory dailies={dailies}></ViewDailyHistory>
          </div>
        </div>

        <div className="w-1/4 border rounded-xl p-4 ">
          <RankingGrid
            ranking={ranking}
            associatedPlayers={playersAssociated}
            allImages={allImages}
          />
        </div>
      </div>
    </div>
  );
}
