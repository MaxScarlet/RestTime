import VacationModel from "../../../Models/VacationModel";
import "./Card.css";

interface CardProps {
  item: VacationModel;
  //   deleteMe: (giftId: number) => void;
}

function Card(props: CardProps): JSX.Element {
  const startDate = new Date(props.item.startDate).toLocaleDateString();
  const endDate = new Date(props.item.endDate).toLocaleDateString();
  return (
    <div className="container">
      <span>Place: {props.item.place}</span>
      <br />
      <img src={props.item.picturePath} />
      {/* <span>Image: {props.item.picturePath} </span> */}
      <br />
      <span>Start Date: {startDate}</span>
      <br />
      <span>End Date: {endDate}</span>
      <br />
      <span>Price: {props.item.price}</span>
      <br />
    </div>
  );
}

export default Card;
