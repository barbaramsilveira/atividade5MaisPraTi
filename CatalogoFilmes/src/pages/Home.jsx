import React from "react";
import "../App.css";
import bgImage from "../assets/banner.jpg";
const Home = () => {
  return (
    <div className="home">
      <img src={bgImage} alt="Cartazes de filmes clássicos" className="bg-img" />
      <div className="overlay">
        <h1 className="title">Meus filmes preferidos</h1>
      </div>
    </div>
  );
};

export default Home;
