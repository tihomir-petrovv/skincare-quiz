import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./Slider.css";

export default function Slider({ products }) {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [visiblePage, setVisiblePage] = useState(1);
  const productsPerPage = 2;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    let startIndex = (visiblePage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setVisibleProducts(products.slice(startIndex, endIndex));
  }, [visiblePage, products]);

  const handleNextPage = () => {
    setVisiblePage((prevPage) => (prevPage === totalPages ? 1 : prevPage + 1));
  };

  const handlePreviousPage = () => {
    setVisiblePage((prevPage) => (prevPage === 1 ? totalPages : prevPage - 1));
  };

  const handleDotClick = (index) => {
    setVisiblePage(index);
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
              <img src={product.images[0].src} alt={product.title} />
              <h5>{product.title}</h5>
              <p>${product.variants[0].price}</p>
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
