import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Success from "./pages/Success";
import PaymentPage from "./pages/PaymentPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<PaymentPage  />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
