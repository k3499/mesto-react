import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, currentUser}) {

  return (
    <main className="content">
    <section className="profile">
      <div className="profile__info">
        <div className="profile__avatar-area" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <div className="profile__avatar-cover" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__wrap">
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" id="edit-profile-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
      </div>
      <button className="profile__add-button" id="add-card-button" type="button" onClick={onAddPlace}></button>
    </section>
    <section className="elements">
      {cards.map((card) =>(
        <Card key={card._id} card={card} onCardClick={onCardClick}/>
      ))}
    </section>

    <div className="popup confirm-popup">
      <div className="popup__container">
        <h2 className="popup__edit-title">Вы уверены?</h2>
        <form className="popup__form" id="confirm-form" name="confirm-form"  method="GET" action="#" noValidate>
          <button className="popup__button" type="submit">Да</button>
        </form>
        <button className="popup__close" id="close-confirm-button" type="button"></button>
      </div>
    </div>
    
  </main>
  );
  }

export default Main;
