import React, {useState} from "react";
import PeladaCard from "./PeladaCard";
import AddPeladaButton from "./AddPeladaButton";
import { Button } from "@/components/ui/button"
import {Search, PlusCircle} from 'lucide-react';
import SearchBar from "./SearchBar";

export default function PeladaGrid({ peladas, onPeladaCreated }) {
  const [searchTerm, setSearchTerm] = useState("");

  const matchesSearchTerm = (pelada, searchTerm) => {
    return pelada.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredPeladas = peladas.filter((pelada) =>
    matchesSearchTerm(pelada, searchTerm)
  );

  console.log("PeladaGrid rendered with peladas:", peladas);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <form className="flex items-center justify-between w-full" onSubmit={(e) => e.preventDefault()}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></SearchBar>
          <AddPeladaButton onPeladaCreated={onPeladaCreated}></AddPeladaButton>
        </form>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {filteredPeladas.map((pelada) => (
          <PeladaCard pelada={pelada} key={pelada.id}></PeladaCard>
        ))}
      </div>
    </div>
  );
}