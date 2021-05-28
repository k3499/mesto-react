
function PopupWithForm({title, name, isOpen, onClose, children}) {
  return ( 
  <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
    <div className="popup__container">
      <h2 className="popup__edit-title">{title}</h2>
      <form className="popup__form" id="profile-form" name={name} noValidate>
        {children}
      </form>
      <button className="popup__close" id="close-profile-button" type="button" onClick={onClose}></button>
    </div>
  </div>
  );
  }

export default PopupWithForm;
