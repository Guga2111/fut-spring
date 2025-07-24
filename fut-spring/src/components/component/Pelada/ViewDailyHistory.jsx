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
import { ChevronRight } from "lucide-react";
import { User } from "lucide-react";
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
import { ArrowBigLeft } from "lucide-react";

export default function ViewDailyHistory({ dailies }) {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="hover:!bg-gray-950 hover:!border-white">
            {" "}
            <User /> Dailies History <ChevronRight />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle>Historical</AlertDialogTitle>
              <AlertDialogCancel className="!bg-white hover:!bg-gray-100">
                <ArrowBigLeft />
              </AlertDialogCancel>
            </div>

            <div className="max-h-[60vh] overflow-y-auto scrollbar-custom">
              <Table>
                <TableCaption>A list of pelada mensalists.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Position</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailies && dailies.length > 0 ? (
                    dailies.map((daily) => {
                      return (
                        <TableRow key={daily.id}>
                          <TableCell className=""></TableCell>
                          <TableCell>{daily.dailyDate}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No dailies found
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
