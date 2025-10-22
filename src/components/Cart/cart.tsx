import { useState } from "react";
import { useCart } from "../../context/orderFormContext";
import "./Cart.scss";

type CartProps = {
  id: string;
  name: string;
  price: number;
  parcelamento: [number, number];
  image: string;
};

const Cart = ({ id, name, price, image, parcelamento }: CartProps) => {

  const { addToCart, loading } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const addItem = async () => {
    setIsLoading(true);
    await addToCart();
    setIsLoading(false);
  };

  return (
    <div className="cart">
      <img src={image} alt={name} className="cart__image" />
      <h3 className="cart__name">{name}</h3>
      <p className="cart__price">R$ {price.toFixed(2)}</p>
      <p className="cart__installments">{`${parcelamento[0]}x de R$ ${parcelamento[1].toFixed(2)}`}</p>
      <button
        onClick={() => addItem()}
        disabled={isLoading}>
        {isLoading ? (
          <div className="loader__buy">
            <div className="loader__buy_circle"></div>
          </div>
        ) : "Comprar"}
      </button>
    </div>
  );
};

export default Cart;
