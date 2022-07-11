import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { StatusContext } from "../../context/status";
import "./ChatMenu.scss";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ChatMenu = () => {
  const {
    openMenuTasks,
    openMenuBp,
    setOpenMenuTasks,
    setOpenMenuBp,
    idCall,
    apiBp,
    contractTaskOptions,
    setContractTaskOptions,
    bpList,
  } = useContext(StatusContext);

  const [thisTabs, setThisTabs] = useState(0);
  const [options, setOptions] = useState([]);
  const [task, setTask] = useState({});
  const [name, setName] = useState("");
  const [bp, setBp] = useState({});
  const [project, setProject] = useState("");
  const [projectSection, setProjectSection] = useState("");
  const [message, setMessage] = useState("");
  const [bool, setBool] = useState("");
  const [contractTaskOptionsNow, setContractTaskOptionsNow] = useState({});

  const sendFile = (e, i) => {
    e.preventDefault();
    const formData = new FormData();

    for (let file in e.target.files) {
      if (typeof e.target.files[file] === "object") {
        console.log(e.target.files[file]);
        formData.append(
          "file_" + e.target.files[file].name,
          e.target.files[file]
        );
      }
    }

    axios
      .post(`${apiBp}/loadFilesToOption/${i}`, formData, {
        headers: {
          "secret-token": document.cookie.replace(
            /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
        },
      })
      .then((res) => {
        console.log(res.data);
        setContractTaskOptionsNow({
          ...contractTaskOptionsNow,
          [i]: {
            ...contractTaskOptionsNow[i],
            files: res.data.file_option,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveOptions = () => {
    if (Object.keys(contractTaskOptionsNow).length > 0) {
      for (let obj in contractTaskOptionsNow) {
        for (let arg in contractTaskOptionsNow[obj]) {
          if (contractTaskOptionsNow[obj][arg] !== null && arg !== "files") {
            if (arg === "valueChild") {
              axios.patch(
                `${apiBp}/extraOption/${contractTaskOptionsNow[obj].id}?value=${contractTaskOptionsNow[obj][arg]}`,
                {},
                {
                  headers: {
                    "secret-token": document.cookie.replace(
                      /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                      "$1"
                    ),
                  },
                }
              );
            } else {
              axios.patch(
                `${apiBp}/extraOption/${contractTaskOptionsNow[obj].id}?${arg}=${contractTaskOptionsNow[obj][arg]}`,
                {},
                {
                  headers: {
                    "secret-token": document.cookie.replace(
                      /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                      "$1"
                    ),
                  },
                }
              );
            }
          }
        }
      }
    }
  };

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
          .then((res) => setTask(res.data.data));
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
          .then((res) => {
            setBp(res.data.data);
            setOptions(res.data.data.tasks);
          });
      }
    }
  }, [idCall]);

  // useEffect(() => {
  //   console.log(contractTaskOptionsNow);
  // }, [contractTaskOptionsNow]);

  // useEffect(() => {
  //   console.log(contractTaskOptions);
  // }, [contractTaskOptions]);

  useEffect(() => {
    if (bp?.id) {
      axios
        .get(`https://test.easy-task.ru/api/v1/projects/${bp.project_id}`, {
          headers: {
            Authorization:
              "Bearer " +
              document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
          },
        })
        .then((res) => setProject(res.data.data.name));

      axios
        .get(
          `https://test.easy-task.ru/api/v1/projectsections/${bp.project_section_id}`,
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
        )
        .then((res) => setProjectSection(res.data.data.name));
    }
  }, [bp]);

  const changeTabs = (i) => {
    if (openMenuTasks) {
      if (i === 3) {
        return false;
      }
      if (i === thisTabs) {
        return false;
      }
      if (i === 2) {
        bpList.filter((el) =>
          el.tasks.filter((i) => {
            if (i.original_id === parseInt(idCall)) {
              setContractTaskOptions(i.results);
            }
          })
        );

        axios
          .get(`${apiBp}/getSampleFile/contract`, {
            headers: {
              "secret-token": document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
            },
          })
          .then((res) => {
            localStorage.setItem("treaty", JSON.stringify(res.data));
          });
      }
    }
    if (openMenuBp) {
      if (i === 2 && !options.length > 0) {
        return false;
      }
    }
    setThisTabs(i);
  };

  useEffect(() => {
    if (task?.id) {
      axios
        .get(`https://test.easy-task.ru/api/v1/users/${task.executor_id}`, {
          headers: {
            Authorization:
              "Bearer " +
              document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
              ),
          },
        })
        .then((res) =>
          setName(res.data.data.name + " " + res.data.data.surname)
        );
    }
  }, [task]);

  const sendMessage = () => {
    let sender = document.cookie.replace(
      /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    fetch(
      `${apiBp}/businessProcess/${bp.id}/comment?sender_id=${sender}&comment_content=${message}&businessProcessId=${bp.id}`,
      {
        method: "POST",
        headers: {
          "secret-token": document.cookie.replace(
            /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
        },
      }
    )
      .then((res) => res.json())
      .then((r) => console.log(r));
  };

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
              style={!!options.tasks ? { color: "#CBCBCB" } : {}}
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
        {openMenuBp && thisTabs === 3 ? (
          <div id="chat">
            <div className="chat-content">
              <div className="chat-content-scroll">
                {!!bp.id
                  ? bp.comments.map((el) => {
                      if (
                        parseInt(
                          document.cookie.replace(
                            /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                            "$1"
                          )
                        ) === el.sender
                      ) {
                        return (
                          <div
                            className="chat-message chat-message-my"
                            key={el.id}
                          >
                            <p>{el.content}</p>
                          </div>
                        );
                      } else {
                        axios
                          .get(
                            `https://test.easy-task.ru/api/v1/users/${el.sender}`,
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
                          )
                          .then((res) =>
                            setName(
                              res.data.data.name + " " + res.data.data.surname
                            )
                          );
                        return (
                          <div
                            className="chat-message chat-message-my"
                            key={el.id}
                          >
                            <h4>{name}</h4>
                            <p>{el.content}</p>
                          </div>
                        );
                      }
                    })
                  : false}
              </div>
            </div>
            <div className="chat-bottom">
              <button
                className="chat-btn"
                style={{
                  marginRight: 17 + "px",
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/input/Vector.svg`}
                />
              </button>
              <button className="chat-btn">
                <img src={`${process.env.PUBLIC_URL}/assets/@.svg`} />
              </button>
              <input
                className="input-form"
                style={{
                  width: 70 + "%",
                  marginLeft: 17 + "px",
                  marginRight: 25 + "px",
                }}
                type="text"
                placeholder="Введите текст"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (message.trim() !== "") {
                      sendMessage();
                      setMessage("");
                    }
                  }
                }}
              />
              <button
                className="chat-btn"
                id="send-message"
                onClick={() => {
                  if (message.trim() !== "") {
                    sendMessage();
                    setMessage("");
                  }
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/send-message.svg`}
                />
              </button>
            </div>
          </div>
        ) : (
          <>
            {openMenuTasks &&
            thisTabs === 2 &&
            !!JSON.parse(localStorage.getItem("treaty")).tasks.filter(
              (el) => el.name === task.name
            ) ? (
              <div className="result">
                <div className="result-content">
                  {!!JSON.parse(localStorage.getItem("treaty")).tasks.filter(
                    (el) => el.name === task.name
                  )[0].results ? (
                    JSON.parse(localStorage.getItem("treaty"))
                      .tasks.filter((el) => el.name === task.name)[0]
                      .results.map((el, i) => {
                        if (el.type === 1) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <input
                                className="input-form input-full"
                                type="text"
                                placeholder={el.name}
                                disabled={!!contractTaskOptions[i]?.value}
                                value={
                                  !!contractTaskOptions[i].value
                                    ? contractTaskOptions[i].value
                                    : contractTaskOptionsNow[i]?.value
                                }
                                onChange={(e) => {
                                  setContractTaskOptionsNow({
                                    ...contractTaskOptionsNow,
                                    [i]: {
                                      ...contractTaskOptionsNow[i],
                                      ...contractTaskOptions[i],
                                      value: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </div>
                          );
                        }
                        if (el.type === 2) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <select
                                className="input-form input-full"
                                disabled={!!contractTaskOptions[i]?.value}
                                value={
                                  !!contractTaskOptions[i]?.value
                                    ? contractTaskOptions[i].value
                                    : contractTaskOptionsNow[i]?.value
                                }
                                onChange={(e) => {
                                  setContractTaskOptionsNow({
                                    ...contractTaskOptionsNow,
                                    [i]: {
                                      ...contractTaskOptionsNow[i],
                                      ...contractTaskOptions[i],
                                      value: e.target.value,
                                    },
                                  });
                                }}
                              >
                                <option value={"Выбрать"}>Выбрать...</option>

                                {!!el.variables ? (
                                  el.variables.map((item, index) => (
                                    <option value={item} key={index}>
                                      {item}
                                    </option>
                                  ))
                                ) : (
                                  <option value={512}>512</option>
                                )}
                              </select>
                            </div>
                          );
                        }
                        if (el.type === 3) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <select
                                className="input-form input-full"
                                disabled={!!contractTaskOptions[i]?.value}
                                value={
                                  !!contractTaskOptions[i].value
                                    ? contractTaskOptions[i].value
                                    : ""
                                }
                                onChange={(e) => {
                                  setContractTaskOptionsNow({
                                    ...contractTaskOptionsNow,
                                    [i]: {
                                      ...contractTaskOptionsNow[i],
                                      ...contractTaskOptions[i],
                                      value: e.target.value,
                                    },
                                  });
                                }}
                              >
                                <option value={"Выбрать"}>Выбрать...</option>
                                {!!contractTaskOptions[i].value ? (
                                  <option value={contractTaskOptions[i].value}>
                                    {contractTaskOptions[i].value}
                                  </option>
                                ) : (
                                  <></>
                                )}
                                {!!el.variables ? (
                                  el.variables.map((item, index) => (
                                    <option value={item} key={index}>
                                      {item}
                                    </option>
                                  ))
                                ) : (
                                  <></>
                                )}
                                <option value={"Другое (указать)"}>
                                  Другое (указать)
                                </option>
                              </select>
                              {contractTaskOptionsNow[i]?.value ===
                              "Другое (указать)" ? (
                                <input
                                  style={{ marginTop: 20 + "px" }}
                                  className="input-form input-full"
                                  type="text"
                                  placeholder={el.name}
                                  onChange={(e) => {
                                    console.log(contractTaskOptionsNow[i]);
                                    setContractTaskOptionsNow({
                                      ...contractTaskOptionsNow,
                                      [i]: {
                                        ...contractTaskOptionsNow[i],
                                        valueChild: e.target.value,
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        }
                        if (el.type === 4) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <div className="we-supply">
                                {el.variables.map((item, index) => {
                                  return (
                                    <div
                                      className="counterparty__radio-input"
                                      key={index}
                                    >
                                      <input
                                        type="radio"
                                        id={item + "-" + i}
                                        name={"counterparty-" + el.name}
                                        style={{ display: "none" }}
                                        data-id={el.name}
                                        disabled={
                                          contractTaskOptions[i]?.bool_value ===
                                            0 ||
                                          contractTaskOptions[i]?.bool_value ===
                                            1 ||
                                          contractTaskOptions[i]?.bool_value ===
                                            2
                                        }
                                        value={
                                          !!contractTaskOptions[i].bool_value
                                            ? contractTaskOptions[i].bool_value
                                            : index
                                        }
                                        onChange={(e) => {
                                          setContractTaskOptionsNow({
                                            ...contractTaskOptionsNow,
                                            [i]: {
                                              ...contractTaskOptionsNow[i],
                                              ...contractTaskOptions[i],
                                              bool_value: parseInt(
                                                e.target.value
                                              ),
                                            },
                                          });
                                        }}
                                      />
                                      <div className="radio-counterparty">
                                        <label
                                          htmlFor={item + "-" + i}
                                          id={item + "-" + i + "-for"}
                                          className={
                                            contractTaskOptionsNow[i]
                                              ?.bool_value === index ||
                                            contractTaskOptions[i]
                                              ?.bool_value === index
                                              ? "we-supply__radio for"
                                              : "we-supply__radio"
                                          }
                                        ></label>
                                        <label htmlFor={item + "-" + i}>
                                          {item}
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                        if (el.type === 5) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <input
                                className="input-form input-form__short"
                                type="number"
                                placeholder="56 000"
                                disabled={!!contractTaskOptions[i]?.value}
                                value={
                                  !!contractTaskOptions[i].value
                                    ? contractTaskOptions[i].value
                                    : contractTaskOptionsNow[i]?.value
                                }
                                onChange={(e) => {
                                  setContractTaskOptionsNow({
                                    ...contractTaskOptionsNow,
                                    [i]: {
                                      ...contractTaskOptionsNow[i],
                                      ...contractTaskOptions[i],
                                      value: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </div>
                          );
                        }
                        if (el.type === 6) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <div className="bool-number">
                                {el.variables.map((item, index) => {
                                  return (
                                    <div
                                      className="counterparty__radio-input"
                                      key={index}
                                    >
                                      <input
                                        type="radio"
                                        id={item + "-" + i}
                                        name={"counterparty-" + el.name}
                                        style={{ display: "none" }}
                                        disabled={
                                          contractTaskOptions[i]?.bool_value ===
                                            0 ||
                                          contractTaskOptions[i]?.bool_value ===
                                            1 ||
                                          contractTaskOptions[i]?.bool_value ===
                                            2
                                        }
                                        value={
                                          !!contractTaskOptions[i].bool_value
                                            ? contractTaskOptions[i].bool_value
                                            : index
                                        }
                                        data-id={el.name}
                                        onChange={(e) => {
                                          setContractTaskOptionsNow({
                                            ...contractTaskOptionsNow,
                                            [i]: {
                                              ...contractTaskOptionsNow[i],
                                              ...contractTaskOptions[i],
                                              bool_value: parseInt(
                                                e.target.value
                                              ),
                                            },
                                          });
                                        }}
                                      />
                                      <div className="radio-counterparty">
                                        <label
                                          htmlFor={item + "-" + i}
                                          id={item + "-" + i + "-for"}
                                          className={
                                            contractTaskOptionsNow[i]
                                              ?.bool_value === index ||
                                            contractTaskOptions[i]
                                              ?.bool_value === index
                                              ? "we-supply__radio for"
                                              : "we-supply__radio"
                                          }
                                        ></label>
                                        <label htmlFor={item + "-" + i}>
                                          {item}
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
                                {contractTaskOptionsNow[i]?.bool_value === 2 ? (
                                  <input
                                    className="input-form input-form__short"
                                    type="number"
                                    placeholder="56 000"
                                    onChange={(e) => {
                                      setContractTaskOptionsNow({
                                        ...contractTaskOptionsNow,
                                        [i]: {
                                          ...contractTaskOptionsNow[i],
                                          value: e.target.value,
                                        },
                                      });
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          );
                        }
                        if (el.type === 7) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <div className="we-supply">
                                {el.variables.map((item, index) => {
                                  return (
                                    <div
                                      className="counterparty__radio-input"
                                      key={index}
                                    >
                                      <input
                                        type="radio"
                                        id={item + "-" + i}
                                        name={"counterparty-" + el.name}
                                        style={{ display: "none" }}
                                        disabled={
                                          contractTaskOptions[i]?.bool_value ===
                                            0 ||
                                          contractTaskOptions[i]?.bool_value ===
                                            1
                                        }
                                        value={
                                          !!contractTaskOptions[i].bool_value
                                            ? contractTaskOptions[i].bool_value
                                            : index
                                        }
                                        data-id={el.name}
                                        onChange={(e) => {
                                          if (
                                            !contractTaskOptions[i].bool_value
                                          ) {
                                            if (e.target.value === "1") {
                                              setContractTaskOptionsNow({
                                                ...contractTaskOptionsNow,
                                                [i]: {
                                                  ...contractTaskOptionsNow[i],
                                                  ...contractTaskOptions[i],
                                                  bool_value: parseInt(
                                                    e.target.value
                                                  ),
                                                  value: null,
                                                  fileId: [],
                                                },
                                              });
                                            } else {
                                              setContractTaskOptionsNow({
                                                ...contractTaskOptionsNow,
                                                [i]: {
                                                  ...contractTaskOptionsNow[i],
                                                  ...contractTaskOptions[i],
                                                  bool_value: parseInt(
                                                    e.target.value
                                                  ),
                                                },
                                              });
                                            }
                                          }
                                        }}
                                      />
                                      <div className="radio-counterparty">
                                        <label
                                          htmlFor={item + "-" + i}
                                          id={item + "-" + i + "-for"}
                                          className={
                                            contractTaskOptionsNow[i]
                                              ?.bool_value === index ||
                                            contractTaskOptions[i]
                                              ?.bool_value === index
                                              ? "we-supply__radio for"
                                              : "we-supply__radio"
                                          }
                                        ></label>
                                        <label htmlFor={item + "-" + i}>
                                          {item}
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              {contractTaskOptionsNow[i]?.bool_value === 0 ||
                              contractTaskOptions[i]?.bool_value === 0 ? (
                                <>
                                  <div style={{ marginTop: 20 + "px" }}>
                                    <input type="file" />
                                    <label className="p__drop-content download-file">
                                      <img
                                        src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                                        alt="download"
                                      />
                                      Прикрепить файл
                                    </label>
                                  </div>
                                  <div style={{ marginTop: 35 + "px" }}>
                                    <label className="p__drop-content">
                                      <img
                                        src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                        alt="Article"
                                      />
                                      Создать договор с нуля
                                    </label>
                                    <div className="we-supply">
                                      <div className="counterparty__radio-input">
                                        <input
                                          type="radio"
                                          disabled={
                                            !!contractTaskOptions[i]?.value
                                          }
                                          value={
                                            !!contractTaskOptions[i].value
                                              ? contractTaskOptions[i].value
                                              : "Да"
                                          }
                                          name="create-treaty"
                                          id="create-treaty-yes"
                                          onChange={(e) => {
                                            setContractTaskOptionsNow({
                                              ...contractTaskOptionsNow,
                                              [i]: {
                                                ...contractTaskOptionsNow[i],
                                                value: e.target.value,
                                              },
                                            });
                                          }}
                                        />
                                        <div className="radio-counterparty">
                                          <label
                                            className={
                                              contractTaskOptionsNow[i]
                                                ?.value === "Да" ||
                                              contractTaskOptions[i]?.value ===
                                                "Да"
                                                ? "we-supply__radio for"
                                                : "we-supply__radio"
                                            }
                                            htmlFor="create-treaty-yes"
                                          ></label>
                                          <label htmlFor="create-treaty-yes">
                                            Да
                                          </label>
                                        </div>
                                      </div>
                                      <div className="counterparty__radio-input">
                                        <input
                                          type="radio"
                                          disabled={
                                            !!contractTaskOptions[i]?.value
                                          }
                                          value={
                                            !!contractTaskOptions[i].value
                                              ? contractTaskOptions[i].value
                                              : "Нет"
                                          }
                                          name="create-treaty"
                                          id="create-treaty-no"
                                          onChange={(e) => {
                                            setContractTaskOptionsNow({
                                              ...contractTaskOptionsNow,
                                              [i]: {
                                                ...contractTaskOptionsNow[i],

                                                value: e.target.value,
                                              },
                                            });
                                          }}
                                        />
                                        <div className="radio-counterparty">
                                          <label
                                            className={
                                              contractTaskOptionsNow[i]
                                                ?.value === "Нет" ||
                                              contractTaskOptions[i]?.value ===
                                                "Нет"
                                                ? "we-supply__radio for"
                                                : "we-supply__radio"
                                            }
                                            htmlFor="create-treaty-no"
                                          ></label>
                                          <label htmlFor="create-treaty-no">
                                            Нет
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        }
                        if (el.type === 8) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              {!!contractTaskOptions[i].value}
                              <TextareaAutosize
                                minRows={4}
                                className="input-form input-full"
                                placeholder={el.name}
                                disabled={!!contractTaskOptions[i]?.value}
                                value={
                                  !!contractTaskOptions[i]?.value
                                    ? contractTaskOptions[i].value
                                    : contractTaskOptionsNow[i]?.value
                                }
                                onChange={(e) => {
                                  setContractTaskOptionsNow({
                                    ...contractTaskOptionsNow,
                                    [i]: {
                                      ...contractTaskOptionsNow[i],
                                      ...contractTaskOptions[i],
                                      value: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </div>
                          );
                        }
                        if (el.type === 9) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <select
                                className="input-form input-full"
                                disabled={!!contractTaskOptions[i]?.value}
                                value={
                                  !!contractTaskOptions[i].value
                                    ? contractTaskOptions[i].value
                                    : ""
                                }
                                onChange={(e) => {
                                  setContractTaskOptionsNow({
                                    ...contractTaskOptionsNow,
                                    [i]: {
                                      ...contractTaskOptionsNow[i],
                                      ...contractTaskOptions[i],
                                      value: e.target.value,
                                    },
                                  });
                                }}
                              >
                                <option value={"Выбрать"}>Выбрать...</option>
                                {!!contractTaskOptions[i].value ? (
                                  <option value={contractTaskOptions[i].value}>
                                    {contractTaskOptions[i].value}
                                  </option>
                                ) : (
                                  <></>
                                )}
                                {!!el.variables ? (
                                  el.variables.map((item, index) => (
                                    <option value={item} key={index}>
                                      {item}
                                    </option>
                                  ))
                                ) : (
                                  <></>
                                )}
                              </select>
                              {contractTaskOptionsNow[i]?.value === "Другое" ? (
                                <input
                                  style={{ marginTop: 20 + "px" }}
                                  className="input-form input-full"
                                  type="number"
                                  placeholder={"Заполните графу"}
                                  onChange={(e) => {
                                    setContractTaskOptionsNow({
                                      ...contractTaskOptionsNow,
                                      [i]: {
                                        ...contractTaskOptionsNow[i],
                                        ...contractTaskOptions[i],
                                        valueChild: e.target.value,
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                              {contractTaskOptionsNow[i]?.value ===
                              "Отсрочка + аванс (указать соотношение отсрочки/аванса в процентах)" ? (
                                <input
                                  style={{ marginTop: 20 + "px" }}
                                  className="input-form input-full"
                                  type="number"
                                  placeholder={"Процентное соотношение..."}
                                  onChange={(e) => {
                                    setContractTaskOptionsNow({
                                      ...contractTaskOptionsNow,
                                      [i]: {
                                        ...contractTaskOptionsNow[i],
                                        ...contractTaskOptions[i],
                                        valueChild: e.target.value,
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                              {contractTaskOptionsNow[i]?.value ===
                              "Отсрочка (указать количество дней до отсрочки)" ? (
                                <input
                                  style={{ marginTop: 20 + "px" }}
                                  className="input-form input-full"
                                  type="number"
                                  placeholder={"Колличество дней отсрочки..."}
                                  onChange={(e) => {
                                    setContractTaskOptionsNow({
                                      ...contractTaskOptionsNow,
                                      [i]: {
                                        ...contractTaskOptionsNow[i],
                                        ...contractTaskOptions[i],
                                        valueChild: e.target.value,
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        }
                        if (el.type === 10) {
                          return (
                            <div key={i}>
                              <label
                                className="p__drop-content"
                                htmlFor={"file-" + i}
                              >
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>

                              {contractTaskOptions[i].files.length > 0 ? (
                                contractTaskOptions[i].files.map((el) => {
                                  return (
                                    <div
                                      className="file-download"
                                      key={el.file.id}
                                    >
                                      <img
                                        src={`${process.env.PUBLIC_URL}/assets/FilePlus.png`}
                                        alt=""
                                      />
                                      {el.file.original_name}
                                    </div>
                                  );
                                })
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    id={"file-" + i}
                                    onChange={(e) =>
                                      sendFile(e, contractTaskOptions[i].id)
                                    }
                                    multiple
                                  />
                                  <label
                                    className="p__drop-content download-file"
                                    htmlFor={"file-" + i}
                                  >
                                    <img
                                      src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                                      alt="download"
                                    />
                                    Прикрепить файл
                                  </label>
                                </>
                              )}
                            </div>
                          );
                        }
                        if (el.type === 11) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <div className="we-supply">
                                {el.variables.map((item, index) => {
                                  return (
                                    <div
                                      className="counterparty__radio-input"
                                      key={index}
                                    >
                                      <input
                                        type="radio"
                                        id={item + "-" + i}
                                        name={"counterparty-" + el.name}
                                        style={{ display: "none" }}
                                        disabled={
                                          contractTaskOptions[i]?.bool_value ===
                                            0 ||
                                          contractTaskOptions[i]?.bool_value ===
                                            1 ||
                                          contractTaskOptions[i]?.bool_value ===
                                            2
                                        }
                                        value={
                                          !!contractTaskOptions[i].bool_value
                                            ? contractTaskOptions[i].bool_value
                                            : index
                                        }
                                        data-id={el.name}
                                        onChange={(e) => {
                                          setContractTaskOptionsNow({
                                            ...contractTaskOptionsNow,
                                            [i]: {
                                              ...contractTaskOptionsNow[i],
                                              ...contractTaskOptions[i],
                                              bool_value: parseInt(
                                                e.target.value
                                              ),
                                            },
                                          });
                                        }}
                                      />
                                      <div className="radio-counterparty">
                                        <label
                                          htmlFor={item + "-" + i}
                                          id={item + "-" + i + "-for"}
                                          className={
                                            contractTaskOptionsNow[i]
                                              ?.bool_value === index ||
                                            contractTaskOptions[i]
                                              ?.bool_value === index
                                              ? "we-supply__radio for"
                                              : "we-supply__radio"
                                          }
                                        ></label>
                                        <label htmlFor={item + "-" + i}>
                                          {item}
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}

                                <input
                                  className="input-form input-full"
                                  type="text"
                                  placeholder="Введите текст..."
                                  style={{
                                    marginLeft: 0,
                                    marginTop: 14 + "px",
                                  }}
                                  disabled={!!contractTaskOptions[i]?.value}
                                  value={
                                    !!contractTaskOptions[i]?.value
                                      ? contractTaskOptions[i].value
                                      : contractTaskOptionsNow[i]?.value
                                  }
                                  onChange={(e) => {
                                    setContractTaskOptionsNow({
                                      ...contractTaskOptionsNow,
                                      [i]: {
                                        ...contractTaskOptionsNow[i],
                                        ...contractTaskOptions[i],
                                        value: e.target.value,
                                      },
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          );
                        }
                        if (el.type === 12) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <div className="bool-number">
                                {el.variables.map((item, index) => {
                                  return (
                                    <div
                                      className="counterparty__radio-input"
                                      key={index}
                                    >
                                      <input
                                        type="radio"
                                        id={item + "-" + i}
                                        name={"counterparty-" + el.name}
                                        style={{ display: "none" }}
                                        disabled={
                                          contractTaskOptions[i]?.bool_value ===
                                            0 ||
                                          (contractTaskOptions[i]
                                            ?.bool_value === 1 &&
                                            contractTaskOptions[i]?.files
                                              .length > 0)
                                        }
                                        value={
                                          !!contractTaskOptions[i].bool_value
                                            ? contractTaskOptions[i].bool_value
                                            : index
                                        }
                                        data-id={el.name}
                                        onChange={(e) => {
                                          setContractTaskOptionsNow({
                                            ...contractTaskOptionsNow,
                                            [i]: {
                                              ...contractTaskOptionsNow[i],
                                              ...contractTaskOptions[i],
                                              bool_value: parseInt(
                                                e.target.value
                                              ),
                                            },
                                          });
                                        }}
                                      />
                                      <div className="radio-counterparty">
                                        <label
                                          htmlFor={item + "-" + i}
                                          id={item + "-" + i + "-for"}
                                          className={
                                            contractTaskOptionsNow[i]
                                              ?.bool_value === index ||
                                            contractTaskOptions[i]
                                              ?.bool_value === index
                                              ? "we-supply__radio for"
                                              : "we-supply__radio"
                                          }
                                        ></label>
                                        <label htmlFor={item + "-" + i}>
                                          {item}
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
                                {contractTaskOptionsNow[i]?.bool_value === 0 ? (
                                  <>
                                    {contractTaskOptions[i].files.length > 0 ? (
                                      contractTaskOptions[i].files.map((el) => {
                                        return (
                                          <div
                                            className="file-download"
                                            key={el.file.id}
                                          >
                                            <img
                                              src={`${process.env.PUBLIC_URL}/assets/FilePlus.png`}
                                              alt=""
                                            />
                                            {el.file.original_name}
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <>
                                        <input
                                          type="file"
                                          id={"file-" + i}
                                          onChange={(e) =>
                                            sendFile(
                                              e,
                                              contractTaskOptions[i].id
                                            )
                                          }
                                          multiple
                                        />
                                        <label
                                          className="p__drop-content download-file"
                                          htmlFor={"file-" + i}
                                        >
                                          <img
                                            src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                                            alt="download"
                                          />
                                          Прикрепить файл
                                        </label>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          );
                        }
                        if (el.type === 13) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <div className="bool-number">
                                {el.variables.map((item, index) => {
                                  return (
                                    <div
                                      className="counterparty__radio-input"
                                      key={index}
                                    >
                                      <input
                                        type="radio"
                                        id={item + "-" + i}
                                        name={"counterparty-" + el.name}
                                        style={{ display: "none" }}
                                        disabled={
                                          contractTaskOptions[i]?.bool_value ===
                                            0 ||
                                          (contractTaskOptions[i]
                                            ?.bool_value === 1 &&
                                            contractTaskOptions[i]?.files
                                              .length > 0)
                                        }
                                        value={
                                          !!contractTaskOptions[i].bool_value
                                            ? contractTaskOptions[i].bool_value
                                            : index
                                        }
                                        data-id={el.name}
                                        onChange={(e) => {
                                          setContractTaskOptionsNow({
                                            ...contractTaskOptionsNow,
                                            [i]: {
                                              ...contractTaskOptionsNow[i],
                                              ...contractTaskOptions[i],
                                              bool_value: parseInt(
                                                e.target.value
                                              ),
                                            },
                                          });
                                        }}
                                      />
                                      <div className="radio-counterparty">
                                        <label
                                          htmlFor={item + "-" + i}
                                          id={item + "-" + i + "-for"}
                                          className={
                                            contractTaskOptionsNow[i]
                                              ?.bool_value === index ||
                                            contractTaskOptions[i]
                                              ?.bool_value === index
                                              ? "we-supply__radio for"
                                              : "we-supply__radio"
                                          }
                                        ></label>
                                        <label htmlFor={item + "-" + i}>
                                          {item}
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
                                {contractTaskOptionsNow[i]?.bool_value === 0 ? (
                                  <>
                                    <input
                                      className="input-form input-full"
                                      type="text"
                                      placeholder={el.name}
                                      disabled={!!contractTaskOptions[i]?.value}
                                      value={
                                        !!contractTaskOptions[i].value
                                          ? contractTaskOptions[i].value
                                          : contractTaskOptionsNow[i]?.value
                                      }
                                      onChange={(e) => {
                                        setContractTaskOptionsNow({
                                          ...contractTaskOptionsNow,
                                          [i]: {
                                            ...contractTaskOptionsNow[i],
                                            value: e.target.value,
                                          },
                                        });
                                      }}
                                    />
                                    {contractTaskOptions[i].files.length > 0 ? (
                                      contractTaskOptions[i].files.map((el) => {
                                        return (
                                          <div
                                            className="file-download"
                                            key={el.file.id}
                                          >
                                            <img
                                              src={`${process.env.PUBLIC_URL}/assets/FilePlus.png`}
                                              alt=""
                                            />
                                            {el.file.original_name}
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <>
                                        <input
                                          type="file"
                                          id={"file-" + i}
                                          onChange={(e) =>
                                            sendFile(
                                              e,
                                              contractTaskOptions[i].id
                                            )
                                          }
                                          multiple
                                        />
                                        <label
                                          className="p__drop-content download-file"
                                          htmlFor={"file-" + i}
                                        >
                                          <img
                                            src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                                            alt="download"
                                          />
                                          Прикрепить файл
                                        </label>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          );
                        }
                        if (el.type === 14) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <TextareaAutosize
                                minRows={3}
                                className="input-form input-full"
                                placeholder={el.name}
                                disabled={!!contractTaskOptions[i]?.value}
                                defaultValue={el.variables}
                                value={
                                  !!contractTaskOptions[i]?.value
                                    ? contractTaskOptions[i].value
                                    : contractTaskOptionsNow[i]?.value
                                }
                                onChange={(e) => {
                                  setContractTaskOptionsNow({
                                    ...contractTaskOptionsNow,
                                    [i]: {
                                      ...contractTaskOptionsNow[i],
                                      ...contractTaskOptions[i],
                                      value: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </div>
                          );
                        }
                        if (el.type === 15) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <select
                                className="input-form input-full"
                                disabled={!!contractTaskOptions[i]?.value}
                                value={
                                  !!contractTaskOptions[i].value
                                    ? contractTaskOptions[i].value
                                    : ""
                                }
                                onChange={(e) => {
                                  setContractTaskOptionsNow({
                                    ...contractTaskOptionsNow,
                                    [i]: {
                                      ...contractTaskOptionsNow[i],
                                      ...contractTaskOptions[i],
                                      value: e.target.value,
                                    },
                                  });
                                }}
                              >
                                <option value={"Выбрать"}>Выбрать...</option>
                                {!!contractTaskOptions[i].value ? (
                                  <option value={contractTaskOptions[i].value}>
                                    {contractTaskOptions[i].value}
                                  </option>
                                ) : (
                                  <></>
                                )}
                                {!!el.variables ? (
                                  el.variables.map((item, index) => (
                                    <option value={item} key={index}>
                                      {item}
                                    </option>
                                  ))
                                ) : (
                                  <></>
                                )}
                              </select>

                              {contractTaskOptionsNow[i]?.value === "Да" ? (
                                <input
                                  style={{ marginTop: 20 + "px" }}
                                  className="input-form input-full"
                                  type="text"
                                  placeholder={"Введите текст"}
                                  onChange={(e) => {
                                    setContractTaskOptionsNow({
                                      ...contractTaskOptionsNow,
                                      [i]: {
                                        ...contractTaskOptionsNow[i],
                                        valueChild: e.target.value,
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        }
                        if (el.type === 16) {
                          return (
                            <div key={i}>
                              <label className="p__drop-content">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                                  alt="Article"
                                />
                                {el.name}
                              </label>
                              <select
                                className="input-form input-full"
                                disabled={!!contractTaskOptions[i]?.value}
                                value={
                                  !!contractTaskOptions[i].value
                                    ? contractTaskOptions[i].value
                                    : ""
                                }
                                onChange={(e) => {
                                  setContractTaskOptionsNow({
                                    ...contractTaskOptionsNow,
                                    [i]: {
                                      ...contractTaskOptionsNow[i],
                                      ...contractTaskOptions[i],
                                      value: e.target.value,
                                    },
                                  });
                                }}
                              >
                                <option value={"Выбрать"}>Выбрать...</option>
                                {!!contractTaskOptions[i].value ? (
                                  <option value={contractTaskOptions[i].value}>
                                    {contractTaskOptions[i].value}
                                  </option>
                                ) : (
                                  <></>
                                )}
                                {!!el.variables ? (
                                  el.variables.map((item, index) => (
                                    <option value={item} key={index}>
                                      {item}
                                    </option>
                                  ))
                                ) : (
                                  <></>
                                )}
                              </select>

                              {contractTaskOptionsNow[i]?.value === "Да" ? (
                                <>
                                  <input
                                    style={{ marginTop: 20 + "px" }}
                                    className="input-form input-full"
                                    type="text"
                                    placeholder={"Введите текст"}
                                    onChange={(e) => {
                                      setContractTaskOptionsNow({
                                        ...contractTaskOptionsNow,
                                        [i]: {
                                          ...contractTaskOptionsNow[i],
                                          valueChild: e.target.value,
                                        },
                                      });
                                    }}
                                  />
                                  {contractTaskOptions[i].files.length > 0 ? (
                                    contractTaskOptions[i].files.map((el) => {
                                      return (
                                        <div
                                          className="file-download"
                                          key={el.file.id}
                                        >
                                          <img
                                            src={`${process.env.PUBLIC_URL}/assets/FilePlus.png`}
                                            alt=""
                                          />
                                          {el.file.original_name}
                                        </div>
                                      );
                                    })
                                  ) : (
                                    <>
                                      <input
                                        type="file"
                                        id={"file-" + i}
                                        onChange={(e) =>
                                          sendFile(e, contractTaskOptions[i].id)
                                        }
                                        multiple
                                      />
                                      <label
                                        className="p__drop-content download-file"
                                        htmlFor={"file-" + i}
                                        style={{ marginTop: 20 + "px" }}
                                      >
                                        <img
                                          src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                                          alt="download"
                                        />
                                        Прикрепить файл
                                      </label>
                                    </>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        }
                        if (el.type === 17) {
                          console.log(el);
                        }
                        if (el.type === 18) {
                          console.log(el, i);
                        }
                        if (el.type === 19) {
                          console.log(el, i);
                        }
                        if (el.type === 20) {
                          console.log(el, i);
                        }
                        if (el.type === 21) {
                          console.log(el, i);
                        }
                        if (el.type === 22) {
                          console.log(el, i);
                        }
                        if (el.type === 23) {
                          console.log(el, i);
                        }
                        if (el.type === 24) {
                          console.log(el, i);
                        }
                      })
                  ) : (
                    <></>
                  )}
                </div>
                <div className="result-bottom">
                  <div
                    className={
                      Object.keys(contractTaskOptionsNow).length > 0
                        ? "blue-btn white-btn "
                        : "blue-btn white-btn white-btn__disabled"
                    }
                    onClick={() => saveOptions()}
                  >
                    Сохранить
                  </div>
                  <div className="defualt__btn">Отмена</div>
                </div>
              </div>
            ) : (
              <div className="chatMenu-container">
                {openMenuTasks && thisTabs === 1 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 35 + "px",
                    }}
                  >
                    <div>
                      <label
                        className="p__drop-content"
                        htmlFor="input-name-Task"
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                        />
                        Название задачи*
                      </label>
                      <div className="input-form input-full">{task.name}</div>
                    </div>
                    <div>
                      <label className="p__drop-content">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/NewspaperClipping.svg`}
                        />
                        Описание
                      </label>
                      <div className="input-desc">
                        <div>
                          <label htmlFor="businessTask__description__what">
                            Что нужно сделать:
                          </label>

                          <div>{task.description}</div>
                        </div>
                        <div>
                          <label htmlFor="businessTask__description__as">
                            Как нужно сделать:
                          </label>
                          <div>{task.description}</div>
                        </div>
                        <div>
                          <label htmlFor="businessTask__description__result">
                            Какой должен быть результат:
                          </label>
                          <div>{task.description}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        className="p__drop-content"
                        htmlFor="businessTask__executor"
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/User.svg`}
                        />
                        Исполнитель
                      </label>

                      <div className="input-form input-full">{name}</div>
                    </div>
                    <div className="input__date">
                      <label className="p__drop-content">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
                        />
                        Дата и время начала
                      </label>
                      <div>
                        <div
                          className="input-form"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          {task.begin}
                        </div>
                      </div>
                    </div>
                    <div className="input__date">
                      <label
                        className="p__drop-content"
                        htmlFor="businessTask__date-end"
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
                        />
                        Дата и время окончания
                      </label>
                      <div>
                        <div
                          className="input-form"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          {task.end}
                        </div>
                      </div>
                    </div>
                    <div className="form-task__dependencies">
                      <div className="p__drop-content">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/ArrowUDownRight.svg`}
                        />
                        Зависимости
                      </div>
                      <div className="form-task__dependencies__btns">
                        <button>Родительская</button>
                        <button>Дочерняя</button>
                        <button>Предыдущая</button>
                        <button>Следующая</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {openMenuBp && thisTabs === 1 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 35 + "px",
                    }}
                  >
                    <div>
                      <label className="p__drop-content" htmlFor="input-name">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                          alt="Article"
                        />
                        Название*
                      </label>

                      <div className="input-form input-full">{bp.name}</div>
                    </div>
                    <div>
                      <label className="p__drop-content">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                          alt="Article"
                        />
                        Проект*
                      </label>

                      <div className="input-form input-full">{project}</div>
                    </div>
                    <div>
                      <label className="p__drop-content">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                          alt="Article"
                        />
                        Секция проекта*
                      </label>

                      <div className="input-form input-full">
                        {projectSection}
                      </div>
                    </div>

                    <div className="input__date">
                      <label className="p__drop-content">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
                          alt="CalendarBlank"
                        />
                        Общий срок
                      </label>
                      <div>
                        <div
                          className="input-form"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          {bp.deadline}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {openMenuBp && thisTabs === 2 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 35 + "px",
                    }}
                  >
                    1111
                    {console.log(options)}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
};

export default ChatMenu;
