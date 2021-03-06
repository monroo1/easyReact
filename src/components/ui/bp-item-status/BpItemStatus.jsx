import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { StatusContext } from "../../../context/status.js";

const BpItemStatus = ({ status, workflow, id }) => {
  const {
    createBpStatus,
    createBpSampleStatus,
    createTaskStatus,
    setOpenTasks,
    openMenuTasks,
    openMenuBp,
    idBp,
    apiBp,
  } = useContext(StatusContext);
  const [statusObj, setStatusObj] = useState({});

  useEffect(() => {
    if (status === 0 || status === 1) {
      if (status === 0) {
        setStatusObj({
          text: "Черновик",
          styleText: {
            color: "#7B7B7B",
          },
          styleIcons: {
            borderColor: "#7B7B7B",
            background: "rgba(123, 123, 123, 0.1)",
          },
          src: "NotePencil.svg",
        });
      }
      if (status === 1) {
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
      }
    } else {
      if (status === 2) {
        if (!!workflow) {
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
        } else {
          setStatusObj({
            text: "Завершен",
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
      } else if (status === 3) {
        if (!!workflow) {
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
        } else {
          setStatusObj({
            text: "Возвращен",
            styleText: {
              color: "#FF9900",
            },
            styleIcons: {
              borderColor: "#FF9900",
              background: "rgba(255, 153, 0, 0.1)",
            },
            src: "ArrowUUpLeft.svg",
          });
        }
      } else if (status === 4) {
        setStatusObj({
          text: "Отменен",
          styleText: {
            color: "#7B7B7B",
          },
          styleIcons: {
            borderColor: "#7B7B7B",
            background: "rgba(123, 123, 123, 0.1)",
          },
          src: "square.svg",
        });
      } else if (status === 5) {
        setStatusObj({
          text: "Просрочен",
          styleText: {
            color: "#F44336",
          },
          styleIcons: {
            borderColor: "#F44336",
            background: "rgba(244, 67, 54, 0.1)",
          },
          src: "overdue.svg",
        });
      } else if (status === 10) {
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
      } else if (status === 11) {
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
      } else if (status === 13) {
        setStatusObj({
          text: "Завершено",
          styleText: {
            color: "#43A047",
          },
          styleIcons: {
            borderColor: "#43A047",
            background: "rgba(67, 160, 71, 0.1)",
          },
          src: "performed.svg",
        });
      } else if (status === 14) {
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
      } else if (status === 15) {
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
      } else if (status === 18) {
        setStatusObj({
          text: "Предзадача",
          styleText: {
            color: "#7B7B7B",
          },
          styleIcons: {
            borderColor: "#7B7B7B",
            background: "rgba(123, 123, 123, 0.1)",
          },
          src: "NotePencil.svg",
        });
      } else if (status === 19) {
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
      } else if (status === 50) {
        setStatusObj({
          text: "Запустить",
          styleText: {
            color: "#01B0E9",
          },
          styleIcons: {
            borderColor: "#01B0E9",
            background: "rgba(1, 176, 233, 0.1)",
          },
          src: "Power.svg",
        });
      }
    }
  }, [setStatusObj, status]);

  const makeActiveTask = (e) => {
    if (parseInt(e.dataset.status) === 50) {
      axios.patch(
        `https://test.easy-task.ru/api/v1/tasks/${e.dataset.id}`,
        { status_id: 3 },
        {
          headers: {
            Authorization:
              "Bearer " +
              document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
          },
        }
      );

      fetch(`${apiBp}/businessProcess/${idBp}/makeActive`, {
        method: "PATCH",
        headers: {
          "secret-token": document.cookie.replace(
            /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
        },
      });
      setOpenTasks("");
    }
  };

  return (
    <div
      className="business__main-content__list-block__item__status"
      onClick={(e) => {
        e.stopPropagation();
        makeActiveTask(e.currentTarget);
      }}
      data-id={id}
      data-status={status}
    >
      <button style={statusObj.styleIcons}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/status/${statusObj.src}`}
          alt="status"
        />
      </button>
      {createBpStatus ||
      createTaskStatus ||
      createBpSampleStatus ||
      openMenuTasks ||
      openMenuBp ? (
        <></>
      ) : (
        <p style={statusObj.styleText}>{statusObj.text}</p>
      )}
    </div>
  );
};

export default BpItemStatus;
