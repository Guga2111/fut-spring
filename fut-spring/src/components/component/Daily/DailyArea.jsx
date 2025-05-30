import AddMatchButton from "./AddMatchButton";
import DailyGrid from "./DailyGrid";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <div>
        <AddMatchButton dailyId={daily.id} teams={teams}></AddMatchButton>
      </div>
      <div>
        <DailyGrid></DailyGrid>
      </div>
    </div>
  );
}
