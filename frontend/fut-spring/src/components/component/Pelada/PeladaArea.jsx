import React, { useEffect, useState } from "react";
import DailyCard from "../Daily/DailyCard";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import ViewPeladaPlayersDialog from "./ViewPeladaPlayersDialog";
import RankingGrid from "./RankingGrid";
import { Skeleton } from "@/components/ui/skeleton";
import PeladaHeader from "./PeladaHeader";
import PeladaChat from "./PeladaChat";
import ViewDailyHistory from "./ViewDailyHistory";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
  const [isHeaderStuck, setIsHeaderStuck] = useState(false);

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const resp = await axiosInstance.get(`/user/images`);
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
          const response = await axiosInstance.get(`/pelada/${id}`);
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
          const response = await axiosInstance.get(`/pelada/${id}/users`);
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
        const response = await axiosInstance.get(`/ranking/${id}`);
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
        const response = await axiosInstance.get(`/pelada/${id}/dailies`);
        setDailies(response.data);
      } catch (error) {
        console.error("Error fetching dailies: ", error);
      }
    };
    fetchDailies();
  }, [id]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsHeaderStuck(true);
      } else {
        setIsHeaderStuck(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
            <Skeleton className="h-10 w-64" />
          </div>
        </div>
  
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <Skeleton className="h-60 w-full rounded-xl" />
              <Skeleton className="h-[56vh] w-full rounded-xl" />
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <Skeleton className="h-36 w-full rounded-xl" />
              <Skeleton className="h-[60vh] w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!peladaData) return <div className="p-4 text-center">Pelada not found</div>;
  
  return (
    <div className="min-h-screen flex flex-col">

<div className={`
  ${isHeaderStuck ? 'sticky top-0 z-30 shadow-md animate-in fade-in duration-200' : 'border-b'}
  bg-background
`}>
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <PeladaHeader peladaData={peladaData} />
  </div>
</div>

      <div className="flex-1 min-h-0 overflow-hidden max-w-7xl mx-auto w-full px-4 md:px-6 py-6">
        <div className="grid grid-cols-12 gap-6">

          <section className="col-span-12 lg:col-span-8 order-1 flex flex-col gap-6 min-h-0">

            <div className="w-full">
              <DailyCard
                pelada={peladaData}
                onDailySelect={onDailySelect}
                user={user}
              />
            </div>


            <RankingGrid
            className="overflow-hidden"
                ranking={ranking}
                associatedPlayers={playersAssociated}
                allImages={allImages}
              />

          </section>
  
          <aside className="col-span-12 lg:col-span-4 space-y-6 order-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Fast actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <ViewPeladaPlayersDialog
                  isLoading={loadingPlayers}
                  playersAssociated={playersAssociated}
                  allImages={allImages}
                />
                <ViewDailyHistory dailies={dailies} />
              </CardContent>
            </Card>

            <div className="sticky top-[88px]">

                          <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Chat</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[56vh]">
                  <PeladaChat
                    playersAssociated={playersAssociated}
                    allImages={allImages}
                    peladaId={id}
                    user={user}
                  />
                </div>
              </CardContent>
            </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}