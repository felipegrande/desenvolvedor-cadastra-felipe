import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header/header"
import Footer from "./components/Footer/footer";

const App = () => {
  return (
    <>
    <Header/>
      <h1>Projeto Cadastra</h1>
      <Footer/>
    </>
  
  )
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
