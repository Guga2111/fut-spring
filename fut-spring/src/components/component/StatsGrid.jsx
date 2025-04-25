import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function StatsGrid({ stats }) {

    if (!stats) {
        return <div>Loading stats...</div>;
      }

  return (
    <div>
      <Table>
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
  );
}
