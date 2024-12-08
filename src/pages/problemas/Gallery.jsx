import Header from "../../components/header/Header";
import React from 'react';
import useStore from "../../stores/use-quiz-store";
import "./Gallery.css";

const Gallery = () => {
    const rewards = useStore((state) => state.rewards);
    return (
        <>
        <Header />
        <div className="inicio-container">
        <div className="gallery">
            <h2>Recompensas Coleccionables</h2>
            <ul>
              {rewards.map((reward, index) => (
                <li key={index}>{reward}</li>
              ))}
            </ul>
          </div>
        </div>
          
        </>

    );
};

export default Gallery;