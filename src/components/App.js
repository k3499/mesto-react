import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import {api, Api} from '../utils/api';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {
  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = React.useState([])
  const loadButtonText = 'Сохранить';

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([ userData, cards  ]) => { 
      setCurrentUser(userData); 
      setCards(cards)
    })
    .catch((err) => console.log(err))
  }, [])

  function handleUpdateUser(userData){
    api.setUserInfo(userData)
        .then(res => {
          setCurrentUser(res);
          setIsEditProfileOpen(false);
        })
        .catch((err) => console.log(err))
  }
  function handleUpdateAvatar(userData){
    api.avatarUpl(userData)
        .then(res => {
          setCurrentUser(res);
          setIsEditAvatarPopupOpen(false);
        })
        .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
  
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        
      })
      .catch((err) => console.log(err))
  }
  function handleCardDelete(card){
    api.removeCard(card._id)
    .then(() => {
        setCards(cards.filter((c) => card._id !== c._id));
    })
    .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(inputData) {
    api.addCard(inputData)
        .then(res => {
            setCards([res, ...cards]);
            setIsAddPlacePopupOpen(false);
        })
        .catch((err) => console.log(err))
  }

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            setCards={setCards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />
          <Footer />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} loadButtonText={loadButtonText}/> 
          <EditProfilePopup  isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} loadButtonText={loadButtonText}/> 
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} loadButtonText={loadButtonText} /> 
          <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
  }

export default App;
