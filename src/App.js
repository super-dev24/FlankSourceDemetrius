import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { data } from "./data";
import { League, Fixture } from "./pages";
import "./styles/main.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<League data={data} />} />
        <Route path="/:club" element={<Fixture data={data} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
