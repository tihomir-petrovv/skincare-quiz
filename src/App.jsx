import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppContext } from "./context/AppContext";
import HomePage from "./pages/HomePage/HomePage";
import Quiz from "./pages/Quiz/Quiz";

function App() {
  const [ selAnswer, setSelAnswer ] = useState({
    selAnswer: null,
  });

  return (
    <>
      <AppContext.Provider value={{...selAnswer, setSelAnswer}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/quiz/:questionId" element={<Quiz />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
