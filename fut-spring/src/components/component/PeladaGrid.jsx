import React from "react";
import PeladaCard from "./PeladaCard";

export default function PeladaGrid({ peladas }) {

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {peladas.map((pelada) => (
          <PeladaCard pelada={pelada} key={pelada.id}></PeladaCard>
        ))}
      </div>
    </div>
  );
}
