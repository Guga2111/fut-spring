import React from "react";
import "./styles.css";

export default function PeladaCard({ pelada }) {
  return (
    <div key={pelada.id} className="pelada-card">
      <div className="pelada-card-info">
        <h3 className="pelada-card-title">{pelada.name}</h3>
        <div>
          <span className="pelada-card-genre">{pelada.time}</span>
          <span className="pelada-card-genre">{pelada.duration}</span>
        </div>
      </div>
    </div>
  );
}
