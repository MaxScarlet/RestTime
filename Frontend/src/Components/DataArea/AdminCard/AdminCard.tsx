import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "../Card/Card.css";
import "./AdminCard.css";

interface CardProps {
  item: VacationModel;
  //   fav: boolean;
  //   deleteMe: (giftId: number) => void;
}

function AdminCard(props: CardProps): JSX.Element {
  const startDate = new Date(props.item.startDate).toLocaleDateString();
  const endDate = new Date(props.item.endDate).toLocaleDateString();
  const navigate = useNavigate();

  function editHandle() {
    console.log("Clicked: ", props.item);
    const vacation = props.item;
    localStorage.setItem("vacation", JSON.stringify(vacation));
    navigate("/edit-vacation");
  }
  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${props.item.picturePath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative", // Ensure the container is a positioned element
      }}
      onClick={editHandle}
    >
      {/* Semi-transparent overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
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
      <br />
      {/* <button onClick={editHandle} className="editBtn">
        Edit
      </button>
      <button className="delBtn">Delete</button>
      <br /> */}
    </div>
  );
}

export default AdminCard;
