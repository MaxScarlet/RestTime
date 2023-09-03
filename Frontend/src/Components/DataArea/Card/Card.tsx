import UserModel from "../../../Models/UserModel";
import "./Card.css";

interface CardProps {
  user: UserModel;
//   deleteMe: (giftId: number) => void;
}

function Card(props: CardProps): JSX.Element {
//   function deleteMe() {
//     props.deleteMe(props.gift.giftId);
//   }
  return (
    <div className="container">
      <span>First Name: {props.user.firstName}</span>
      <br />
      <span>Last Name: {props.user.lastName}</span>
      <br />
      <span>Email: {props.user.email}</span>
      <br />
      <span>Admin: {props.user.isAdmin}</span>
      <br />
    </div>
  );
}

export default Card;
