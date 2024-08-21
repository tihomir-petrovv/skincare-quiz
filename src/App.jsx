import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppContext } from "./context/AppContext";
import HomePage from "./pages/HomePage/HomePage";
import Quiz from "./pages/Quiz/Quiz";
import Result from "./pages/Result/Result";

/**
 * Renders the main application component.
 *
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
  const localStorageItems = JSON.parse(localStorage.getItem("answers"));
  const [ context, setContext ] = useState( localStorageItems || {
    answers: null,
  });

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(context));
  }, [context]);

  return (
    <>
      <AppContext.Provider value={{...context, setContext}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/quiz/:questionId" element={<Quiz />} />
            <Route path="/results" element={<Result />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
