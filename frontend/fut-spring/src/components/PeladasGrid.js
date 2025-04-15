import React, { useState } from "react";
import PeladaCard from "./PeladaCard";
import "./styles.css";

export default function PeladasGrid({ peladas }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const matchesSearchTerm = (pelada, searchTerm) => {
    return pelada.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredPeladas = peladas.filter((pelada) =>
    matchesSearchTerm(pelada, searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search for Peladas Group's..."
        value={searchTerm}
        onChange={handleSearchTerm}
      ></input>
      <div className="peladas-grid">
        {filteredPeladas.map((pelada) => (
          <PeladaCard pelada={pelada} key={pelada.id}></PeladaCard>
        ))}
      </div>
    </div>
  );
}
