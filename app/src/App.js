// App.js
import React from "react";
import "./styles/App.css";
import {Container} from "react-bootstrap";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        hier kommt der inhalt hin
      </Container>
    </div>
  );
}

export default App;
