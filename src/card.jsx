import { useState } from "react";

function Card(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={props.imagen} alt={props.titulo} />
      <div className="card-content">
        <h2>{props.titulo}</h2>
        <p>{props.descripcion}</p>
      </div>
    </div>
  );
}
