import React, { useContext, useState, useEffect } from "react";
import { StatusContext } from "../../context/status.js";
import BpItemStatus from "../ui/bp-item-status/BpItemStatus";
import BpItemMenu from "../ui/bp-item-menu/BpItemMenu.jsx";
import TasksList from "../tasks-list/TasksList.jsx";
import axios from "axios";

const BpItem = ({ el }) => {
  const {
    createBpStatus,
    createBpSampleStatus,
    idBp,
    setIdBp,
    openTasks,
    setOpenTasks,
    bearer,
    setOpenMenuBp,
    openMenuTasks,
    openMenuBp,
    setIdCallBp,
    setOpenMenuTasks,
    setContractBp,
    projects,
    setBpResultStatus,
    setBpCall,
  } = useContext(StatusContext);
  const [project, setProject] = useState();
  const [projectSection, setProjectSection] = useState({});

  const openTasksMenu = (e) => {
    if (e.id === openTasks) {
      setOpenTasks("");
    } else {
      setOpenTasks(e.id);
    }
  };

  useEffect(() => {
    setProject(...projects.filter((item) => item.id === el.project_id));

    axios
      .get(
        `https://test.easy-task.ru/api/v1/projectsections/${el.project_section_id}`,
        {
          headers: {
            Authorization: "Bearer " + bearer,
          },
        }
      )
      .then((res) => {
        setProjectSection({
          ...res.data.data,
          name: res.data.data.name.slice(0, 12),
        });
      });
  }, []);

  return (
    <div
      className={
        createBpStatus || createBpSampleStatus || openMenuTasks || openMenuBp
          ? "business__main-content__list-block__item business__main-content__list-block__item-active"
          : "business__main-content__list-block__item"
      }
    >
      <div
        id={"business-item-" + el.id}
        onClick={(e) => {
          setIdCallBp(el.id);
          openTasksMenu(e.currentTarget);
        }}
      >
        <div className="business__main-content__list-block__item-left">
          <div className="business__main-content__list-block__item__arrow">
            <img
              src={`${process.env.PUBLIC_URL}/assets/ShapeBlack.svg`}
              alt="drop"
              style={{ opacity: 0.5 }}
            />
          </div>
          <div className="business__main-content__list-block__item__logo">
            <img
              src={`${process.env.PUBLIC_URL}/assets/header-profile-logo.png`}
              alt="logo"
            />
          </div>
          <div
            className="business__main-content__list-block__item__message business__main-content__list-block__item__message-active"
            id={"business-item-btn-" + el.id}
            onClick={() => {
              setBpCall(1);
              el.type === 1
                ? setContractBp(el.id)
                : el.type === 2
                ? setContractBp(el.id)
                : el.type === 3
                ? setContractBp(el.id)
                : setContractBp("");
              setIdCallBp(el.id);
              setOpenMenuBp(true);
              setOpenMenuTasks(false);
              setBpResultStatus(true);
            }}
          >
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/assets/message.svg`}
                alt="message"
              />
            </div>
          </div>
          <div className="business__main-content__list-block__item__name">
            <p className="p-black">{el.name.slice(0, 20)}</p>
          </div>
        </div>
        <div className="business__main-content__list-block__item-right">
          <BpItemStatus status={el.status} />
          <p className="business__main-content__list-block__item__deadline p-black">
            {new Date(el.deadline)
              .toLocaleString("ru", {
                month: "long",
                day: "numeric",
              })
              .slice(0, 7)}
          </p>
          <div className="business__main-content__list-block__item__project">
            <p className="p-black">{project?.name.slice(0, 10)}</p>
            <span className="p-grey">{projectSection.name}</span>
          </div>
        </div>
        <div
          className="dropdown-menu__bpItem"
          data-id={el.id}
          onClick={(e) => {
            e.stopPropagation();
            if (e.target.dataset.id === idBp) {
              setIdBp("");
            } else {
              setIdBp(parseInt(e.target.dataset.id));
            }
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/drop-down-menu.svg`}
            alt="menu"
            data-id={el.id}
            onClick={(e) => {
              e.stopPropagation();
              if (e.target.dataset.id === idBp) {
                setIdBp("");
              } else {
                setIdBp(parseInt(e.target.dataset.id));
              }
            }}
          />
        </div>
        <BpItemMenu id={el.id} />
      </div>
      {openTasks === "business-item-" + el.id ? (
        <TasksList tasks={el.tasks} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default BpItem;
