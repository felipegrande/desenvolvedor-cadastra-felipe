
import "./Header.scss";
import logo from "../../img/logo.png"
import cart from "../../img/cart.png"
import { useCart } from "../../context/orderFormContext";

const Header = () => {

  const { cartCount } = useCart();
  
  return (
    <header className="header" >
      <div className="header__content" >
        <img src={logo} alt="Logo da loja" />
        <div className="header__content_minicart">
          <img src={cart} alt="simbolo de sacola" />
          {cartCount > 0 && (
            <div className="header__content_minicart_count">
              <span >{cartCount}</span>
            </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;