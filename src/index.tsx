import "./app.scss";
import ReactDOM from "react-dom/client";
import Header from "./components/Header/header"
import Footer from "./components/Footer/footer";
import Search from "./components/Search/search";
import { CartProvider } from "./context/orderFormContext";

const App = () => {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main className="app__content">
          <Search />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
