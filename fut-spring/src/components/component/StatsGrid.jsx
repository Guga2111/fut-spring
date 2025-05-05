import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatsChart from "./StatsChart";
import { Progress } from "@/components/ui/progress"

export default function StatsGrid({ stats }) {

    if (!stats) {
        return <div><Progress value={33} /></div>;
      }

  return (
    <div className="w-full h-screen">
      <div>
      <Table className="w-full">
        <TableCaption>A list of your stats.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">Goals</TableHead>
            <TableHead>Assists</TableHead>
            <TableHead>Puskas</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{stats.goals}</TableCell>
            <TableCell>{stats.assists}</TableCell>
            <TableCell>{stats.puskasTimes}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </div>
      <div>
        {/*<StatsChart></StatsChart>*/}
        {/* standby this chart */}
      </div>
      
    </div>
  );
}
