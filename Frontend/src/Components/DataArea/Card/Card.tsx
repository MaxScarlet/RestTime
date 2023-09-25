import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./Card.css";
import appConfig from "../../../Utils/AppConfig";

interface CardProps {
  item: VacationModel;
  fav: boolean;
  //   deleteMe: (giftId: number) => void;
}

function Card(props: CardProps): JSX.Element {
  const startDate = new Date(props.item.startDate).toLocaleDateString();
  const endDate = new Date(props.item.endDate).toLocaleDateString();
  const navigate = useNavigate();

  function isAdmin() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.isAdmin) {
      return true;
    } else {
      return false;
    }
  }
  function editClick() {
    const vacation = props.item;
    localStorage.setItem("vacation", JSON.stringify(vacation));
    navigate(`/vacation/${props.item._id}/edit`);
  }

  function deleteClick() {
    console.log("Deleting...");

    // navigate(`/vacation/${props.item._id}/delete`);
  }
  function imageAnalysis(picturePath: string, id: string) {
    if (picturePath && picturePath.startsWith("http")) {
      return picturePath;
    } else {
      return appConfig.vacationUrl + id + "/image";
    }
  }
  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${imageAnalysis(
          props.item.picturePath,
          props.item._id
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative", // Ensure the container is a positioned element
      }}
    >
      {/* Semi-transparent overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the opacity here (0.5 for 50% opacity)
        }}
      ></div>
      <span className="infoSpan" style={{ position: "relative", zIndex: 1 }}>
        Place: {props.item.place}
      </span>
      <br />
      <span className="infoSpan" style={{ position: "relative", zIndex: 1 }}>
        Description: {props.item.description}
      </span>
      <br />
      <br />
      <span className="infoSpan" style={{ position: "relative", zIndex: 1 }}>
        Start Date: {startDate}
      </span>
      <br />
      <span className="infoSpan" style={{ position: "relative", zIndex: 1 }}>
        End Date: {endDate}
      </span>
      <br />
      <span className="infoSpan" style={{ position: "relative", zIndex: 1 }}>
        Price: {props.item.price}$
      </span>
      <br />
      {!isAdmin() ? (
        props.fav ? (
          <button>Follow</button>
        ) : null
      ) : (
        <div className="adminMenu" style={{ position: "relative", zIndex: 1 }}>
          <button onClick={editClick}>Edit</button>
          <button onClick={deleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Card;
