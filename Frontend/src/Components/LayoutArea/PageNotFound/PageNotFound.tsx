import "./PageNotFound.css";
import image from "../../../../public/images/404_page.jpg";

function PageNotFound(): JSX.Element {
  return (
    <div className="PageNotFound">
      <span> 404 page not found</span>
      <img src={image} />
    </div>
  );
}

export default PageNotFound;
