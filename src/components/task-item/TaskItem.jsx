import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StatusContext } from "../../context/status";
import BpItemStatus from "../ui/bp-item-status/BpItemStatus";

const TaskItem = ({ style, el, parentId }) => {
  const {
    createBpStatus,
    setOpenMenuTasks,
    openMenuTasks,
    openMenuBp,
    createTaskStatus,
    createBpSampleStatus,
    setIdCall,
    setOpenMenuBp,
    bpList,
    setContractBp,
    setContractTaskOptions,
  } = useContext(StatusContext);
  const [classTask, setClassTask] = useState(
    "dependencies__content-list__item"
  );

  useEffect(() => {
    if (style === "dropdown") {
      if (
        openMenuTasks ||
        openMenuBp ||
        createTaskStatus ||
        createBpSampleStatus ||
        createBpStatus
      ) {
        setClassTask(
          "dependencies__content-list__item dependencies__content-list__item-active dependencies__content-list__item-dropdown"
        );
      } else {
        setClassTask(
          "dependencies__content-list__item dependencies__content-list__item-dropdown"
        );
      }
    } else {
      if (
        openMenuTasks ||
        openMenuBp ||
        createTaskStatus ||
        createBpSampleStatus ||
        createBpStatus
      ) {
        setClassTask(
          "dependencies__content-list__item dependencies__content-list__item-active"
        );
      } else {
        setClassTask("dependencies__content-list__item");
      }
    }
  }, [
    style,
    openMenuTasks,
    openMenuBp,
    createTaskStatus,
    createBpSampleStatus,
    createBpStatus,
  ]);

  return (
    <div
      className={classTask}
      id={el?.id}
      data-parentid={parentId}
      onClick={(e) => {
        setIdCall(e.currentTarget.id);
        setOpenMenuTasks(true);
        setOpenMenuBp(false);
        let bp = bpList.filter((item) => {
          let arg;
          item.tasks.filter((e) => {
            if (e.original_id === el.id) {
              arg = true;
            }
            if (arg === true) {
              return true;
            }
          });
          if (arg === true) {
            return true;
          } else {
            return false;
          }
        });
        {
          bp[0].type === 1
            ? setContractBp(bp[0].id)
            : bp[0].type === 2
            ? setContractBp(bp[0].id)
            : bp[0].type === 3
            ? setContractBp(bp[0].id)
            : setContractBp("");
        }
        bpList.filter((el) =>
          el.tasks.filter((i) => {
            if (i.original_id === parseInt(e.currentTarget.id)) {
              setContractTaskOptions(i.results);
            }
          })
        );
      }}
    >
      <div className="dependencies__content-list__item__btn">
        <div className="business__main-content__list-block__item__arrow">
          <img
            src={`${process.env.PUBLIC_URL}/assets/ShapeBlack.svg`}
            alt="drop"
            style={{ opacity: 0.5 }}
          />
        </div>
        <div
          className="business__main-content__list-block__item__message business__main-content__list-block__item__message-active"
          id={"business-item-btn-" + 1}
        >
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/assets/message.svg`}
              alt="message"
            />
          </div>
        </div>
      </div>

      <div className="dependencies__content-list__item__title">
        <p className="p-black">{el?.name.slice(0, 20)}</p>
        <span className="p-grey">{el?.description.slice(0, 20)}</span>
      </div>
      <div className="dependencies__content-list__item__right">
        <BpItemStatus
          status={el?.status_id}
          workflow={el?.workflow_id}
          id={el?.id}
        />
        <div className="dependencies__content-list__deadline p-black">
          {new Date(new Date(el?.end).toJSON())
            .toLocaleString("ru", {
              month: "long",
              day: "numeric",
            })
            .slice(0, 7)}
        </div>
        <div className="business__main-content__list-block__item__logo business__main-content__list-block__item__logo__task">
          <img
            src={`${process.env.PUBLIC_URL}/assets/header-profile-logo.png`}
            alt="logo"
          />
        </div>
        <div className="dependencies__content-list__project">
          <p className="p-black">{"projectTheme".slice(0, 10)}</p>
          <span className="p-grey">{"projectTheme".slice(0, 12)}</span>
        </div>
        {createBpStatus ||
        createTaskStatus ||
        createBpSampleStatus ||
        openMenuTasks ||
        openMenuBp ? (
          <></>
        ) : (
          <div className="dependencies__content-list__item__right__priority">
            <div className="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
            <div className="dependencies__content-list__item__right__priority-indicator dependencies__content-list__item__right__priority-indicator__active"></div>
            <div className="dependencies__content-list__item__right__priority-indicator"></div>
          </div>
        )}

        <div className="dependencies__content-list__item__right__list">
          <img src={`${process.env.PUBLIC_URL}/assets/List.svg`} alt="list" />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
