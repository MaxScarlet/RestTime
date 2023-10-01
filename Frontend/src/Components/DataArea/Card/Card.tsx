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

interface CardProps {
  item: VacationModel;
  fav: boolean;
  refresh: (vacationId: string) => void;
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
          backgroundColor: "rgba(0, 0, 0, 0.3)",
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
