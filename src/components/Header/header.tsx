
import "./Header.scss";
import logo from "../../img/logo.png"
import cart from "../../img/cart.png"

const Header = () => {
  return (
    <header className="header" >
      <div className="header__content" >
        <img src={logo} alt="Logo da loja" />
        <img src={cart} alt="simbolo de sacola" />
      </div>
    </header>
  );
};

export default Header;