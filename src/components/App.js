import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';

function App() {
  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [cards, setCards] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({})

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([ userData, cards  ]) => { 
      setCurrentUser(userData); 
      setCards(cards)
    })
    .catch((err) => console.log(err))
  }, [])

  function handleCardClick(card) {
    setSelectedCard(card)
  }
  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick(){
    setIsEditProfileOpen(true);
  }
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null)
  }
  
  return (
  <div className="wrapper">
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        cards={cards}
        currentUser={currentUser}
      />
      <Footer />
      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name="ava" title="Обновить аватар" >
          <input className="popup__input" name="avalink" type="url" id="ava-link" placeholder="Ссылка на аватар" required/>
          <span id="ava-link-error" className="popup__error"></span>
          <button className="popup__button" type="submit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} name="profile" title="Редактировать профиль" >
        <input className="popup__input popup__input_type_name" type="text" id="profileName"  name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
        <span id="profileName-error" className="popup__error"></span>
        <input className="popup__input popup__input_type_job" type="text" id="profileJob"  name="job" placeholder="Профессия" required minLength="2" maxLength="40"/>
        <span id="profileJob-error" className="popup__error"></span>
        <button className="popup__button" type="submit">Сохранить</button>
      </PopupWithForm> 
      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name="card" title="Новое место" >
        <input className="popup__input popup__input_type_name" type="text" id="cardName"  name="cardname" placeholder="Название" required minLength="2" maxLength="30"/>
        <span id="cardName-error" className="popup__error"></span>
        <input className="popup__input popup__input_type_job" type="url" id="cardLink"  name="cardlink" placeholder="Ссылка на картинку" required/>
        <span id="cardLink-error" className="popup__error"></span>
        <button className="popup__button" type="submit">Создать</button>
      </PopupWithForm>
      <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
    </div>
  </div>
  );
  }

export default App;
