import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import userService from "../../../Services/UserService";
import appConfig from "../../../Utils/AppConfig";
import { useAuth } from "../../LayoutArea/AuthProvider";
import "./Card.css";
import jwt_decode from "jwt-decode";

interface CardProps {
  item: VacationModel;
  fav: boolean;
  //   deleteMe: (giftId: number) => void;
}

function Card(props: CardProps): JSX.Element {
  const startDate = new Date(props.item.startDate).toLocaleDateString();
  const endDate = new Date(props.item.endDate).toLocaleDateString();
  const params = useParams();
  const navigate = useNavigate();
  const { token, logout, isAdmin } = useAuth();
  const decodedToken: any = jwt_decode(token);

  function editClick() {
    const vacation = props.item;
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
  function likeFnc(id: string, liked: boolean) {
    // const userId = decodedToken.id;
    if (liked) {
      //   const favRemove = userService.favRemove(id, decodedToken.id);
    } else {
      //   const favAdd = userService.favAdd(id, decodedToken.id);
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
      {!isAdmin() ? (
        <span
          className={props.fav ? "heart Liked" : "heart"}
          title="Like"
          onClick={(e) => likeFnc(props.item._id, props.fav)}
        >
          ❤
        </span>
      ) : (
        <div className="adminMenu" style={{ position: "relative", zIndex: 5 }}>
          <span onClick={editClick} className="adminButton">
            📃
          </span>
          <span onClick={deleteClick} className="adminButton">
            ❌
          </span>
        </div>
      )}
      <div className="textContainer">
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
      </div>
    </div>
  );
}

export default Card;
