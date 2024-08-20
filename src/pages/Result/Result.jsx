import { useContext, useEffect, useState } from "react";
import fetchProductRecommendation from "../../request-services/fetch-product-recommendation";
import { AppContext } from "../../context/AppContext";
import resultImage from "../../images/results-page-img.png";
import { useNavigate } from "react-router";
import Slider from "../../components/Slider/Slider";
import "./Result.css";

export default function Result() {
  const { selectedAnswers } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductRecommendation(selectedAnswers).then((data) => {
      setProducts(data);
    });
  }, [selectedAnswers]);

  const retakeQuiz = () => {
    navigate("/");
  };

  return (
    <>
      <div id="main-result-container">
        <img src={resultImage} alt="result-page-background-image" />
        <div id="welcome-result-container">
          <h3>Build you everyday self care routine.</h3>
          <p>
            Perfect for if you&apos;re looking for soft, nourished skin, our
            moisturizing body washes are made with skin-natural nutrients that
            work with your skin to replenish moisture. With a light formula, the
            bubbly lather leaves your skin feeling cleansed and cared for. And
            by choosing relaxing fragrances you can add a moment of calm to the
            end of your day.
          </p>
          <button onClick={retakeQuiz}>Retake the quiz</button>
        </div>
      </div>
      {products ? <Slider products={products} /> : <p>...Loading</p>}
    </>
  );
}
