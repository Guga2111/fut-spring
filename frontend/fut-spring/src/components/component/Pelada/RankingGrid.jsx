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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { API_BASE_URL } from "../../../config";

import React from "react";

export default function RankingGrid({ ranking, associatedPlayers, allImages }) {
  const [tab, setTab] = React.useState("general");

  const mapEntries = (type) =>
    (ranking.prizes || [])
      .filter((entry) => entry.typeOfPrize === type)
      .map((entry) => ({
        ...entry,
        user: associatedPlayers.find((p) => p.id === entry.userId) || {
          id: entry.userId,
          name: "Unknown",
          photo: "",
        },
      }));

  const goalsPrizes = mapEntries("TOPSCORER");
  const assistsPrizes = mapEntries("TOPASSIST");
  const puskasPrizes = mapEntries("PUSKAS");

  const getImageSrc = (filename) => {
    if (!filename) return "/default-avatar.jpg";
    const exists = allImages.includes(filename);
    return exists
      ? `${API_BASE_URL}/user/images/${filename}`
      : "default-avatar.jpg";
  };

  return (
    <div className="w-full p-4">
      <Select onValueChange={(value) => setTab(value)}>
        <SelectTrigger className="w-[200px] text-green-600 !bg-white">
          <SelectValue placeholder="Select view..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="general">General</SelectItem>
          <SelectItem value="goals">Golden Boot</SelectItem>
          <SelectItem value="assists">Playmaker</SelectItem>
          <SelectItem value="puskas">Puskas</SelectItem>
        </SelectContent>
      </Select>

      <Tabs value={tab} onValueChange={setTab} className="mt-4">
        <div className="p-4">
          <TabsContent value="goals">
            <Table>
              <TableCaption>Goals Ranking.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goalsPrizes.map(({ user, date }) => (
                  <TableRow key={`${user.id}-${date}`}>
                    <TableCell className="font-medium">
                      <div className="flex justify-center items-center">
                        <div className="overflow-hidden rounded-full w-10 h-10">
                          <img
                            src={getImageSrc(user.image)}
                            alt={user.username}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell className="text-right">
                      {date ? new Date(date).toLocaleDateString() : "-"}
                    </TableCell>
                  </TableRow>
                ))}
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

                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assistsPrizes.map(({ user, date }) => (
                  <TableRow key={`${user.id}-${date}`}>
                    <TableCell className="font-medium">
                      <div className="flex justify-center items-center">
                        <div className="overflow-hidden rounded-full w-10 h-10">
                          <img
                            src={getImageSrc(user.image)}
                            alt={user.username}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>

                    <TableCell className="text-right">
                      {date ? new Date(date).toLocaleDateString() : "-"}
                    </TableCell>
                  </TableRow>
                ))}
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

                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {puskasPrizes.map(({ user, date }) => (
                  <TableRow key={`${user.id}-${date}`}>
                    <TableCell className="font-medium">
                      <div className="flex justify-center items-center">
                        <div className="overflow-hidden rounded-full w-10 h-10">
                          <img
                            src={getImageSrc(user.image)}
                            alt={user.username}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>

                    <TableCell className="text-right">
                      {date ? new Date(date).toLocaleDateString() : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="general">
            <Table>
              <TableCaption>General Ranking.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead>Goals</TableHead>
                  <TableHead className="text-right">Assists</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium"></TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <span>{ranking.goals}</span>
                      <IoFootball />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span>{ranking.assists}</span>
                      <BiSolidBullseye />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
