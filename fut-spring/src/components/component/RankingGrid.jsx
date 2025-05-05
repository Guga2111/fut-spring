import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoFootball } from "react-icons/io5";
import { BiSolidBullseye } from "react-icons/bi";
import { GiSoccerKick } from "react-icons/gi";

export default function RankingGrid() {

  return (
    <div className="w-full">
      <Tabs defaultValue="ranking">
        <div className="flex justify-center">
        <TabsList className="flex space-x-4">
          <TabsTrigger value="goals" className="text-white">Goals</TabsTrigger>
          <TabsTrigger value="assists" className="text-white">Assists</TabsTrigger>
          <TabsTrigger value="puskas" className="text-white">Puskas</TabsTrigger>
        </TabsList>
        </div>
        <TabsContent value="goals">
          <Table>
            <TableCaption>Goals Ranking.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex justify-center items-center ">
                    <div className="overflow-hidden rounded-full w-10 h-10">
                      <img
                        src={"backgroundbalotelli.jpg"}
                        alt={"Player"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </TableCell>

                <TableCell>Players name</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span>50</span>
                    <IoFootball />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="assists">
          <Table>
            <TableCaption>Assists Ranking.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
              <TableCell className="font-medium">
                  <div className="flex justify-center items-center ">
                    <div className="overflow-hidden rounded-full w-10 h-10">
                      <img
                        src={"backgroundbalotelli.jpg"}
                        alt={"Player"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>Players name</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span>50</span>
                    <BiSolidBullseye />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="puskas">
          <Table>
            <TableCaption>Puskas Ranking.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
              <TableCell className="font-medium">
                  <div className="flex justify-center items-center ">
                    <div className="overflow-hidden rounded-full w-10 h-10">
                      <img
                        src={"backgroundbalotelli.jpg"}
                        alt={"Player"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>Players name</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span>50</span>
                    <GiSoccerKick />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
