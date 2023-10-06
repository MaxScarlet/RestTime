/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import userService from "../../../Services/UserService";
import appConfig from "../../../Utils/AppConfig";
import { useAuth } from "../../LayoutArea/AuthProvider";
import "./Card.css";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import vacationService from "../../../Services/VacationService";
import reportsService from "../../../Services/ReportsService";
import { report } from "process";

interface CardProps {
  item: VacationModel;
  fav: boolean;
  refresh: (vacationId: string) => void;
}

function Card(props: CardProps): JSX.Element {
  const startDate = new Date(props.item.startDate).toLocaleDateString();
  const endDate = new Date(props.item.endDate).toLocaleDateString();
  const [likeCount, setLikeCount] = useState<number | null>(null);

  const params = useParams();

  const navigate = useNavigate();
  const { token, logout, isAdmin } = useAuth();
  const decodedToken: any = jwt_decode(token);

  useEffect(() => {
    async function fetchLikeCount() {
      try {
        const likeCount = await reportsService.getInfo(props.item._id);
        setLikeCount(likeCount);
      } catch (error) {
        console.error("Error fetching like count:", error);
        setLikeCount(0); // Set a default value in case of an error
      }
    }

    fetchLikeCount();
  }, [props.item._id]);

  function editClick() {
    const vacation = props.item;
    navigate(`/vacation/${props.item._id}/edit`);
  }

  async function toggleEnableDisable() {
    await vacationService.toggleVacation(props.item._id);
    props.refresh(props.item._id);
  }

  function imageAnalysis(picturePath: string, id: string) {
    if (picturePath && picturePath.startsWith("http")) {
      return picturePath;
    } else {
      return appConfig.vacationUrl + id + "/image";
    }
  }

  async function likeFnc(id: string, liked: boolean) {
    if (liked) {
      const favRemove = await userService.favRemove(id, decodedToken.id);
    } else {
      const favAdd = await userService.favAdd(id, decodedToken.id);
    }
    props.refresh(id);
    const updatedLikeCount = await reportsService.getInfo(props.item._id);
    setLikeCount(updatedLikeCount);
  }
  return (
    <div
      className="cardContainer"
      style={{
        backgroundImage: `url(${imageAnalysis(
          props.item.picturePath,
          props.item._id
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        opacity: "0.8",
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
          backgroundColor: "rgba(0, 77, 75, 0.5)",
        }}
      ></div>
      {!isAdmin() ? (
        <span
          className={props.fav ? "heart Liked" : "heart"}
          title="Like"
          onClick={(e) => likeFnc(props.item._id, props.fav)}
        >
          ❤ (
          <span className="likeSpan">
            {likeCount !== null ? likeCount : "."}
          </span>
          )
        </span>
      ) : (
        <div className="adminMenu" style={{ position: "relative", zIndex: 5 }}>
          <span onClick={editClick} className="adminButton">
            📃
          </span>
          {props.item.isDisabled ? (
            <span onClick={toggleEnableDisable} className="adminButton">
              ❔
            </span>
          ) : (
            <span onClick={toggleEnableDisable} className="adminButton">
              ❌
            </span>
          )}
        </div>
      )}
      <div className="textContainer">
        <span className="infoSpan" style={{ position: "relative", zIndex: 1 }}>
          <h3>{props.item.place}</h3>
        </span>
        <br />
        <span className="infoSpan" style={{ position: "relative", zIndex: 1 }}>
          {props.item.description}
        </span>
        <br />
        <br />
        <span className="infoSpan" style={{ position: "relative", zIndex: 1 }}>
          {startDate} - {endDate}
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
