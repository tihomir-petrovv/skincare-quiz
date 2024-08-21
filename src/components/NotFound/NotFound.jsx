import notFoundImage from "../../images/not-found-image.jpeg";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div id="not-found-container">
      <img src={notFoundImage} alt="page-not-found-background" />
      <div id="info">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          We&apos;re sorry, the page you are looking for could not be found.
          Please check the URL in the address bar and try again.
        </p>
      </div>
    </div>
  );
}
