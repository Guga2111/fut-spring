import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ChevronRight,
  User,
  Search,
  ArrowBigLeft,
  CalendarCheck,
  CalendarPlus,
  CirclePlay,
  FlagTriangleRight,
  CircleX,
  Info,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format, parse, isValid, isSameDay } from "date-fns";

export default function ViewDailyHistory({ dailies }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDailies = dailies.filter((daily) => {
    if (!searchTerm) {
      return true;
    }

    const searchDate = parse(searchTerm, "yyyy-MM-dd", new Date());

    if (!isValid(searchDate)) {
      return daily.dailyDate.includes(searchTerm);
    }

    const dailyDate = parse(daily.dailyDate, "yyyy-MM-dd", new Date());

    return isValid(dailyDate) && isSameDay(dailyDate, searchDate);
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "SCHEDULED":
        return <CalendarPlus className="h-4 w-4 text-blue-500 mr-2" />;
      case "CONFIRMED":
        return <CalendarCheck className="h-4 w-4 text-green-500 mr-2" />;
      case "IN_COURSE":
        return <CirclePlay className="h-4 w-4 text-yellow-500 mr-2" />;
      case "FINISHED":
        return <FlagTriangleRight className="h-4 w-4 text-purple-500 mr-2" />;
      case "CANCELED":
        return <CircleX className="h-4 w-4 text-red-500 mr-2" />;
      default:
        return <Info className="h-4 w-4 text-gray-500 mr-2" />;
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="hover:!bg-gray-950 hover:!border-white">
            <User className="mr-2" /> Dailies History{" "}
            <ChevronRight className="ml-2" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between items-center mb-4">
              <AlertDialogTitle>Historical Dailies</AlertDialogTitle>
              <AlertDialogCancel className="!bg-white hover:!bg-gray-100">
                <ArrowBigLeft />
              </AlertDialogCancel>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by date (YYYY-MM-DD)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="max-h-[60vh] overflow-y-auto scrollbar-custom">
              <Table>
                <TableCaption>
                  A history of all pelada daily games.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]"></TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDailies && filteredDailies.length > 0 ? (
                    filteredDailies.map((daily) => (
                      <TableRow key={daily.id}>
                        <TableCell className=""></TableCell>
                        <TableCell>
                          {format(
                            parse(daily.dailyDate, "yyyy-MM-dd", new Date()),
                            "MMM dd, yyyy"
                          )}
                        </TableCell>
                        <TableCell className="flex items-center h-full">
                          {getStatusIcon(daily.status)}
                          {daily.status}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="!outline"
                            size="sm"
                            className="!text-neutral-200 hover:!text-white hover:!bg-green-600 hover:!border-white"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No dailies found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
