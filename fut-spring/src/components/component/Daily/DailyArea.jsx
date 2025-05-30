import AddMatchButton from "./AddMatchButton";
import DailyGrid from "./DailyGrid";
import { useEffect, useState } from "react";
import axios from "axios";
import DailyHeader from "./DailyHeader";

export default function DailyArea({ daily }) {
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/daily/${daily.id}/teams`
        );
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams: ", error);
      }
    };

    fetchTeams();
  }, []);

  console.log(daily);

  if (daily === null) {
    return <div>Daily not found...</div>;
  }

  return (
    <div class="relative w-full">
      <div>
        <div class="flex justify-center items-center py-4">
          <DailyHeader daily={daily}></DailyHeader>
        </div>
        <div class="absolute top-4 right-4">
          <AddMatchButton dailyId={daily.id} teams={teams}></AddMatchButton>
        </div>
      </div>
      <div>
        <DailyGrid daily={daily}></DailyGrid>
      </div>
    </div>
  );
}
