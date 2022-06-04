import React from "react";
import { Route, Routes } from "react-router-dom";

import Board from "./Board";
import Card from "./Card";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/new" element={<Card />} />
        <Route path="/:cardNumber" element={<Card />} />
      </Routes>
    </div>
  );
}

export default App;
