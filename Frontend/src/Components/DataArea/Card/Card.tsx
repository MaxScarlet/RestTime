import VacationModel from "../../../Models/VacationModel";
import "./Card.css";

interface CardProps {
  item: VacationModel;
  fav: boolean;
  //   deleteMe: (giftId: number) => void;
}

function Card(props: CardProps): JSX.Element {
  const startDate = new Date(props.item.startDate).toLocaleDateString();
  const endDate = new Date(props.item.endDate).toLocaleDateString();

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${props.item.picturePath})`,
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
      {/* <img src={props.item.picturePath} /> */}
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
      {props.fav ? <button>Follow</button> : null}
    </div>
  );
}

export default Card;
