import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { StatusContext } from "../../context/status";
import "./ChatMenu.scss";
import CreateTaskForm from "../create-task-form/CreateTaskForm";
import { useState } from "react";

const ChatMenu = () => {
  const {
    openMenuTasks,
    openMenuBp,
    setOpenMenuTasks,
    setOpenMenuBp,
    idCall,
    apiBp,
  } = useContext(StatusContext);

  const [thisTabs, setThisTabs] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!!idCall) {
      if (openMenuTasks) {
        setThisTabs(1);
        axios
          .get(`https://test.easy-task.ru/api/v1/tasks/${idCall}`, {
            headers: {
              Authorization:
                "Bearer " +
                document.cookie.replace(
                  /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                  "$1"
                ),
            },
          })
          .then((res) => console.log(res.data.data));
      }
      if (openMenuBp) {
        setThisTabs(3);
        axios
          .get(`${apiBp}/businessProcess/${idCall}`, {
            headers: {
              "secret-token": document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
            },
          })
          .then((res) => setOptions(res.data.data.options));
      }
    }
  }, [idCall]);

  const changeTabs = (i) => {
    if (openMenuTasks) {
      if (i === 2 || i === 3) {
        return false;
      }
      if (i === thisTabs) {
        return false;
      }
      console.log(i);
    }
    if (openMenuBp) {
      if (i === 2 && !options.length > 0) {
        return false;
      }
    }
    setThisTabs(i);
  };

  useEffect(() => {
    console.log(options);
  }, [options]);
  // options: [] если есть - у нас имеется  результат

  if (openMenuTasks || openMenuBp) {
    return (
      <div className="chatMenu">
        <div className="chatMenu-header">
          <div className="chatMenu-header__nav">
            <div
              className={
                thisTabs === 1
                  ? "chatMenu-header__nav-item chatMenu-header__nav-item-active"
                  : "chatMenu-header__nav-item"
              }
              onClick={() => changeTabs(1)}
            >
              Информация
            </div>
            <div
              className={
                thisTabs === 2
                  ? "chatMenu-header__nav-item chatMenu-header__nav-item-active"
                  : "chatMenu-header__nav-item"
              }
              style={
                openMenuTasks || !options.length > 0 ? { color: "#CBCBCB" } : {}
              }
              onClick={() => changeTabs(2)}
            >
              Результат
            </div>
            <div
              className={
                thisTabs === 3
                  ? "chatMenu-header__nav-item chatMenu-header__nav-item-active"
                  : "chatMenu-header__nav-item"
              }
              style={openMenuTasks ? { color: "#CBCBCB" } : {}}
              onClick={() => changeTabs(3)}
            >
              Чат
            </div>
          </div>
          <div
            className="chatMenu-header__close"
            onClick={() => {
              setOpenMenuTasks(false);
              setOpenMenuBp(false);
            }}
          >
            Закрыть
          </div>
        </div>
        <div className="chatMenu-container"></div>
      </div>
    );
  }
};

export default ChatMenu;
