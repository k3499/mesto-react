import React, { useState, useEffect } from 'react';

function Card({ card, onCardClick }) {
  
  function handleClick() {
    onCardClick(card);
  }
  return (
        <article className="element">
        <button className="element__delete" type="button"></button>
        <div className="element__image" onClick={handleClick} style={{ backgroundImage: `url(${card.link})` }} alt={card.name}></div>
        <div className="element__info">
            <h2 className="element__title">{card.name}</h2>
            <div>
              <button className="element__like" type="button"></button>
              <p className="element__like-count">{card.likes.length}</p>
            </div>
        </div>
      </article>
  );
  }

export default Card;
