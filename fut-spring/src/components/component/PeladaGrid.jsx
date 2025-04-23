import React from "react";
import PeladaCard from "./PeladaCard";
import AddPeladaButton from "./AddPeladaButton";
import { Button } from "@/components/ui/button"
import {Search, PlusCircle} from 'lucide-react';
export default function PeladaGrid({ peladas }) {

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <form className="flex items-center gap-2">
          
          <AddPeladaButton>
          <PlusCircle className="w-4 h-4 mr-2"/>
          </AddPeladaButton>
        </form>
             
      
        
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {peladas.map((pelada) => (
          <PeladaCard pelada={pelada} key={pelada.id}></PeladaCard>
        ))}
      </div>
    </div>
  );
}
