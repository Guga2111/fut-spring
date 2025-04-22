import React from "react";
import PeladaCard from "./PeladaCard";

export default function PeladaGrid({ peladas }) {

  return (
    <div>
      <div className="peladas-grid">
        {peladas.map((pelada) => (
          <PeladaCard pelada={pelada} key={pelada.id}></PeladaCard>
        ))}
      </div>
    </div>
  );
}
