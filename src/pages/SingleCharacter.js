import React from "react";
import { useParams } from "react-router-dom";

const SingleCharacter = () => {
  const params = useParams();
  return (
    <div>
      <h1>SINGLE CHARACTER</h1>
      <p>{params.characterId}</p>
    </div>
  );
};

export default SingleCharacter;
