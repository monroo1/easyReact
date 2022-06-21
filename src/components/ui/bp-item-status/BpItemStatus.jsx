import React, { useEffect, useState, useContext } from "react";
import { StatusContext } from "../../../context/status.js";

const BpItemStatus = (status) => {
  const { createBpStatus, createTaskStatus } = useContext(StatusContext);
  const [statusObj, setStatusObj] = useState({});

  useEffect(() => {
    if (status.status === 0 || status.status === 1) {
      if (status.status === 0) {
        setStatusObj({
          text: "Предзадача",
          styleText: {
            color: "black",
          },
          styleIcons: { border: "none", background: "transparent" },
          src: "NotePencil.svg",
        });
      } else {
        setStatusObj({
          text: "Идея",
          styleText: {
            color: "black",
          },
          styleIcons: {
            border: "none",
            background: "transparent",
          },
          src: "Lightbulb.svg",
        });
      }
    } else {
      if (status.status === 2) {
        setStatusObj({
          text: "Отменена",
          styleText: {
            color: "#7B7B7B",
          },
          styleIcons: {
            borderColor: "#7B7B7B",
            background: "rgba(123, 123, 123, 0.1)",
          },
          src: "square.svg",
        });
      } else if (status.status === 3) {
        setStatusObj({
          text: "В архиве",
          styleText: {
            color: "#7B7B7B",
          },
          styleIcons: {
            borderColor: "#7B7B7B",
            background: "rgba(123, 123, 123, 0.1)",
          },
          src: "folders.svg",
        });
      } else if (status.status === 4) {
        setStatusObj({
          text: "Исполнителю",
          styleText: {
            color: "#FF9900",
          },
          styleIcons: {
            borderColor: "#FF9900",
            background: "rgba(255, 153, 0, 0.1)",
          },
          src: "users.svg",
        });
      } else if (status.status === 5) {
        setStatusObj({
          text: "Автору",
          styleText: {
            color: "#FF9900",
          },
          styleIcons: {
            borderColor: "#FF9900",
            background: "rgba(255, 153, 0, 0.1)",
          },
          src: "user.svg",
        });
      } else if (status.status === 6) {
        setStatusObj({
          text: "Просрочена",
          styleText: {
            color: "#F44336",
          },
          styleIcons: {
            borderColor: "#F44336",
            background: "rgba(244, 67, 54, 0.1)",
          },
          src: "overdue.svg",
        });
      } else if (status.status === 7) {
        setStatusObj({
          text: "В работе",
          styleText: {
            color: "#436EA0",
          },
          styleIcons: {
            borderColor: "#436EA0",
            background: "rgba(67, 110, 160, 0.1)",
          },
          src: "play.svg",
        });
      } else if (status.status === 8) {
        setStatusObj({
          text: "Выполнено",
          styleText: {
            color: "#43A047",
          },
          styleIcons: {
            borderColor: "#43A047",
            background: "rgba(67, 160, 71, 0.1)",
          },
          src: "performed.svg",
        });
      }
    }
  }, [setStatusObj, status]);

  return (
    <div className="business__main-content__list-block__item__status">
      <button style={statusObj.styleIcons}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/status/${statusObj.src}`}
          alt="status"
        />
      </button>
      {createBpStatus === true || createTaskStatus === true ? (
        <></>
      ) : (
        <p style={statusObj.styleText}>{statusObj.text}</p>
      )}
    </div>
  );
};

export default BpItemStatus;
