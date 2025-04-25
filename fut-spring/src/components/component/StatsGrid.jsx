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

  return (
    <div>
      <Table>
        <TableCaption>A list of your stats.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Goals</TableHead>
            <TableHead>Assists</TableHead>
            <TableHead>Puskas</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{stats.goals}</TableCell>
            <TableCell>{stats.assists}</TableCell>
            <TableCell>{stats.puskasTimes}</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
