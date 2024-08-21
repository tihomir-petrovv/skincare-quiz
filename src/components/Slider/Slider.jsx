import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./Slider.css";
import heart from "../../images/favorite.svg";
import fullHeart from "../../images/heart.svg";

export default function Slider({ products }) {
  const [favorites, setFavorites] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [visiblePage, setVisiblePage] = useState(1);
  const productsPerPage = 2;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    const nonFavoriteProducts = products.filter(
      (product) => !storedFavorites.some((fav) => fav.id === product.id)
    );

    setDisplayedProducts([...storedFavorites, ...nonFavoriteProducts]);
  }, [products]);

  useEffect(() => {
    let startIndex = (visiblePage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setVisibleProducts(displayedProducts.slice(startIndex, endIndex));
  }, [visiblePage, displayedProducts]);

  const handleNextPage = () => {
    setVisiblePage((prevPage) => (prevPage === totalPages ? 1 : prevPage + 1));
  };

  const handlePreviousPage = () => {
    setVisiblePage((prevPage) => (prevPage === 1 ? totalPages : prevPage - 1));
  };

  const handleDotClick = (index) => {
    setVisiblePage(index);
  };

  const toggleFavorite = (product) => {
    const updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex((fav) => fav.id === product.id);

    if (index >= 0) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(product);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    
  };

  return (
    <>
      <div id="main-slider-container">
        <div id="slider-container">
          <button
            onClick={handlePreviousPage}
            className={visiblePage === 1 ? "hide-button" : "change-page-button"}
          >
            &lt;
          </button>
          <div className="product-card title">
            <div id="title-desc-container">
              <h5>Daily routine</h5>
              <p>
                Perfect for if you&apos;re looking for soft, nourished skin, our
                moisturizing body washes are made with skin-natural nutrients
                that work with your skin to replenish moisture. With a light
                formula, the bubbly lather leaves your skin feeling cleansed and
                cared for. And by choosing relaxing fragrances you can add a
                moment of calm to the end of your day.
              </p>
            </div>
          </div>

          {visibleProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.images[0].src}
                alt={product.title}
                className="item-image"
              />
              <h5>{product.title}</h5>
              <p>${product.variants[0].price}</p>
              <img
                src={favorites.some((fav) => fav.id === product.id) ? fullHeart : heart}
                alt="favorite-heart-image"
                className="favorite-icon"
                onClick={() => toggleFavorite(product)}
              />
            </div>
          ))}

          <button
            onClick={handleNextPage}
            className={
              visiblePage === totalPages ? "hide-button" : "change-page-button"
            }
          >
            &gt;
          </button>
        </div>
      </div>
      <div id="dots">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={index + 1 === visiblePage ? "dot active" : "dot"}
            onClick={() => handleDotClick(index + 1)}
          ></span>
        ))}
      </div>
    </>
  );
}

Slider.propTypes = {
  products: PropTypes.array,
};
