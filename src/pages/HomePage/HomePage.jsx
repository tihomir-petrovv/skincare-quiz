import { NavLink } from "react-router-dom";
import homeImage from "../../images/home-page-img.png";
import "./HomePage.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

/**
 * Renders the Home Page component.
 *
 * @returns {JSX.Element} The rendered Home Page component.
 */
export default function HomePage() {
  const { setContext } = useContext(AppContext);

  useEffect(() => {
    setContext({
      answers: null,
    });
  }, [setContext]);

  return (
    <div id="home-page">
      <img src={homeImage} alt="background" />
      <div id="home-page-container">
        <h1>Build a self care routine suitable for you</h1>
        <p>
          Take out test to get a personalized self care routine based on your
          needs.
        </p>
        <NavLink to={"/quiz/1"}>Start the quiz</NavLink>
      </div>
    </div>
  );
}
