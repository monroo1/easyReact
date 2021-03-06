import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { StatusContext } from "../../context/status";
import Result from "../result/Result";

import "./ChatMenu.scss";

const ChatMenu = () => {
  const {
    openMenuTasks,
    openMenuBp,
    setOpenMenuTasks,
    setOpenMenuBp,
    idCall,
    apiBp,
    bpCall,
    bpList,
    contractTaskOptionsNow,
    contractBp,
    task,
    setTask,
    projects,
    idCallBp,
    bp,
    setBp,
    setBpCall,
    thisBp,
    setContractBp,
    setIdCallBp,
    setBpResultStatus,
  } = useContext(StatusContext);

  const [thisTabs, setThisTabs] = useState(0);
  const [options, setOptions] = useState([]);

  const [name, setName] = useState("");

  const [project, setProject] = useState("");
  const [projectSection, setProjectSection] = useState("");
  const [message, setMessage] = useState("");

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
        setThisTabs(2);
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
    }
  }, [idCall]);

  useEffect(() => {
    if (!!idCallBp) {
      if (openMenuBp) {
        if (bpCall === 1) {
          setThisTabs(3);
          setBp(bpList.filter((item) => item.id === idCallBp)[0]);
          setOptions(bpList.filter((item) => item.id === idCallBp)[0].tasks);
        }
        if (bpCall === 2) {
          setThisTabs(2);
          setBp(bpList.filter((item) => item.id === idCallBp)[0]);
          setOptions(bpList.filter((item) => item.id === idCallBp)[0].tasks);
        }
      }
    }
  }, [idCallBp]);

  useEffect(() => {
    if (bp?.id) {
      setProject(projects.filter((item) => item.id === bp.project_id)[0].name);

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
    }
    if (openMenuBp) {
      if (i === 2 && !options.length > 0) {
        return false;
      } else if (i === 2) {
        setBpCall(2);
        thisBp.type === 1
          ? setContractBp(thisBp.id)
          : thisBp.type === 2
          ? setContractBp(thisBp.id)
          : thisBp.type === 3
          ? setContractBp(thisBp.id)
          : setContractBp("");
        setIdCallBp(thisBp.id);
        setBpResultStatus(true);
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
      .then((r) => setBp({ ...bp, comments: [...bp.comments, r.newComment] }));
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
              ????????????????????
            </div>
            <div
              className={
                thisTabs === 2
                  ? "chatMenu-header__nav-item chatMenu-header__nav-item-active"
                  : "chatMenu-header__nav-item"
              }
              // style={!!options.tasks ? { color: "#CBCBCB" } : {}}
              onClick={() => changeTabs(2)}
            >
              ??????????????????
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
              ??????
            </div>
          </div>
          <div
            className="chatMenu-header__close"
            onClick={() => {
              setOpenMenuTasks(false);
              setOpenMenuBp(false);
            }}
          >
            ??????????????
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
                placeholder="?????????????? ??????????"
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
            {openMenuTasks && thisTabs === 2 ? (
              <div className="result">
                <div className="result-content">
                  {!!contractBp ? (
                    bpList.filter((el) => {
                      if (el.id === contractBp) {
                        return el;
                      }
                    })[0].type === 1 ? (
                      <Result
                        resultArr={"treaty"}
                        disabled={
                          task.executor_id ===
                          parseInt(
                            document.cookie.replace(
                              /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                              "$1"
                            )
                          )
                            ? false
                            : true
                        }
                      />
                    ) : bpList.filter((el) => {
                        if (el.id === contractBp) {
                          return el;
                        }
                      })[0].type === 3 ? (
                      <Result
                        resultArr={"recruitment"}
                        disabled={
                          task.executor_id ===
                          parseInt(
                            document.cookie.replace(
                              /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                              "$1"
                            )
                          )
                            ? false
                            : true
                        }
                      />
                    ) : bpList.filter((el) => {
                        if (el.id === contractBp) {
                          return el;
                        }
                      })[0].type === 2 ? (
                      <Result
                        resultArr={"dismissal"}
                        disabled={
                          task.executor_id ===
                          parseInt(
                            document.cookie.replace(
                              /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                              "$1"
                            )
                          )
                            ? false
                            : true
                        }
                      />
                    ) : (
                      <></>
                    )
                  ) : (
                    <div>
                      {task.name} {task.id}.
                    </div>
                  )}
                </div>
                {task.executor_id ===
                parseInt(
                  document.cookie.replace(
                    /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
                    "$1"
                  )
                ) ? (
                  <div className="result-bottom">
                    <div
                      className={
                        Object.keys(contractTaskOptionsNow).length > 0
                          ? "blue-btn white-btn "
                          : "blue-btn white-btn white-btn__disabled"
                      }
                      onClick={() => saveOptions()}
                    >
                      ??????????????????
                    </div>
                    <div className="defualt__btn">????????????</div>
                  </div>
                ) : (
                  <></>
                )}
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
                        ???????????????? ????????????*
                      </label>
                      <div className="input-form input-full">{task.name}</div>
                    </div>
                    <div>
                      <label className="p__drop-content">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/NewspaperClipping.svg`}
                        />
                        ????????????????
                      </label>
                      <div className="input-desc">
                        <div>
                          <label htmlFor="businessTask__description__what">
                            ?????? ?????????? ??????????????:
                          </label>

                          <div>{task.description}</div>
                        </div>
                        <div>
                          <label htmlFor="businessTask__description__as">
                            ?????? ?????????? ??????????????:
                          </label>
                          <div>{task.description}</div>
                        </div>
                        <div>
                          <label htmlFor="businessTask__description__result">
                            ?????????? ???????????? ???????? ??????????????????:
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
                        ??????????????????????
                      </label>

                      <div className="input-form input-full">{name}</div>
                    </div>
                    <div className="input__date">
                      <label className="p__drop-content">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
                        />
                        ???????? ?? ?????????? ????????????
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
                        ???????? ?? ?????????? ??????????????????
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
                        ??????????????????????
                      </div>
                      <div className="form-task__dependencies__btns">
                        <button>????????????????????????</button>
                        <button>????????????????</button>
                        <button>????????????????????</button>
                        <button>??????????????????</button>
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
                        ????????????????*
                      </label>

                      <div className="input-form input-full">{bp.name}</div>
                    </div>
                    <div>
                      <label className="p__drop-content">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                          alt="Article"
                        />
                        ????????????*
                      </label>

                      <div className="input-form input-full">{project}</div>
                    </div>
                    <div>
                      <label className="p__drop-content">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                          alt="Article"
                        />
                        ???????????? ??????????????*
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
                        ?????????? ????????
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
                    {!!contractBp ? (
                      bpList.filter((el) => {
                        if (el.id === contractBp) {
                          return el;
                        }
                      })[0].type === 1 ? (
                        <Result resultArr={"treaty"} disabled={true} />
                      ) : bpList.filter((el) => {
                          if (el.id === contractBp) {
                            return el;
                          }
                        })[0].type === 3 ? (
                        <Result resultArr={"recruitment"} disabled={true} />
                      ) : bpList.filter((el) => {
                          if (el.id === contractBp) {
                            return el;
                          }
                        })[0].type === 2 ? (
                        <Result resultArr={"dismissal"} disabled={true} />
                      ) : (
                        <></>
                      )
                    ) : (
                      <div>
                        {bp.name} {bp.id}.bp
                      </div>
                    )}
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
