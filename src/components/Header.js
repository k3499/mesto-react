import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
    <a href="#" target="_self"><img className="logo" src={logo} alt="Логотип"/></a>
</header>
  );
  }

export default Header;
