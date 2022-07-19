import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StatusContext } from "../../context/status";
import TextareaAutosize from "react-textarea-autosize";

const Result = ({ resultArr, disabled }) => {
  const {
    apiBp,
    contractTaskOptions,
    contractTaskOptionsNow,
    setContractTaskOptionsNow,
    setContractTaskOptions,
    task,
    bp,
    bpResultStatus,
    setBpResultStatus,
  } = useContext(StatusContext);
  const [resultArrLast, setResultArrLast] = useState([]);

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

  useEffect(() => {
    if (!!task) {
      setResultArrLast(
        ...JSON.parse(localStorage.getItem(`${resultArr}`)).tasks.filter(
          (el) => el.name === task.name
        )
      );
    }
  }, [task]);

  useEffect(() => {
    if (!!bp && !!bpResultStatus) {
      let arr = [];
      bp.tasks.map((el) => el.results.map((item) => arr.push(item)));
      setContractTaskOptions(arr);

      let arrInput = [];
      JSON.parse(localStorage.getItem(`${resultArr}`)).tasks.map((tas) => {
        if (!!tas.results) {
          tas.results.map((i) => arrInput.push(i));
        }
      });
      setResultArrLast({ results: arrInput });
      setBpResultStatus(false);
    }
  }, [bp, bpResultStatus]);

  return !!resultArrLast &&
    !!resultArrLast?.results &&
    !!contractTaskOptions ? (
    resultArrLast.results.map((el, i) => {
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
              disabled={disabled ? true : false}
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
              disabled={disabled ? true : false}
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
              disabled={disabled ? true : false}
              value={
                !!contractTaskOptions[i]?.value
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
              {!!contractTaskOptions[i]?.value ? (
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
              <option value={"Другое (указать)"}>Другое (указать)</option>
            </select>
            {contractTaskOptionsNow[i]?.value === "Другое (указать)" ? (
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
            <div className="bool-number">
              {el.variables.map((item, index) => {
                return (
                  <div className="counterparty__radio-input" key={index}>
                    <input
                      type="radio"
                      id={item + "-" + i}
                      name={"counterparty-" + el.name}
                      style={{ display: "none" }}
                      data-id={el.name}
                      disabled={disabled ? true : false}
                      value={
                        !!contractTaskOptions[i]?.bool_value
                          ? contractTaskOptions[i].bool_value
                          : index
                      }
                      onChange={(e) => {
                        setContractTaskOptionsNow({
                          ...contractTaskOptionsNow,
                          [i]: {
                            ...contractTaskOptionsNow[i],
                            ...contractTaskOptions[i],
                            bool_value: parseInt(e.target.value),
                          },
                        });
                      }}
                    />
                    <div className="radio-counterparty">
                      <label
                        htmlFor={item + "-" + i}
                        id={item + "-" + i + "-for"}
                        className={
                          contractTaskOptionsNow[i]?.bool_value === index ||
                          contractTaskOptions[i]?.bool_value === index
                            ? "we-supply__radio for"
                            : "we-supply__radio"
                        }
                      ></label>
                      <label htmlFor={item + "-" + i}>{item}</label>
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
              disabled={disabled ? true : false}
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
                  <div className="counterparty__radio-input" key={index}>
                    <input
                      type="radio"
                      id={item + "-" + i}
                      name={"counterparty-" + el.name}
                      style={{ display: "none" }}
                      disabled={disabled ? true : false}
                      value={
                        !!contractTaskOptions[i]?.bool_value
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
                            bool_value: parseInt(e.target.value),
                          },
                        });
                      }}
                    />
                    <div className="radio-counterparty">
                      <label
                        htmlFor={item + "-" + i}
                        id={item + "-" + i + "-for"}
                        className={
                          contractTaskOptionsNow[i]?.bool_value === index ||
                          contractTaskOptions[i]?.bool_value === index
                            ? "we-supply__radio for"
                            : "we-supply__radio"
                        }
                      ></label>
                      <label htmlFor={item + "-" + i}>{item}</label>
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
            <div className="bool-number">
              {el.variables.map((item, index) => {
                return (
                  <div className="counterparty__radio-input" key={index}>
                    <input
                      type="radio"
                      id={item + "-" + i}
                      name={"counterparty-" + el.name}
                      style={{ display: "none" }}
                      disabled={disabled ? true : false}
                      value={
                        !!contractTaskOptions[i]?.bool_value
                          ? contractTaskOptions[i].bool_value
                          : index
                      }
                      data-id={el.name}
                      onChange={(e) => {
                        if (!contractTaskOptions[i].bool_value) {
                          if (e.target.value === "1") {
                            setContractTaskOptionsNow({
                              ...contractTaskOptionsNow,
                              [i]: {
                                ...contractTaskOptionsNow[i],
                                ...contractTaskOptions[i],
                                bool_value: parseInt(e.target.value),
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
                                bool_value: parseInt(e.target.value),
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
                          contractTaskOptionsNow[i]?.bool_value === index ||
                          contractTaskOptions[i]?.bool_value === index
                            ? "we-supply__radio for"
                            : "we-supply__radio"
                        }
                      ></label>
                      <label htmlFor={item + "-" + i}>{item}</label>
                    </div>
                  </div>
                );
              })}
            </div>
            {contractTaskOptionsNow[i]?.bool_value === 0 ||
            contractTaskOptions[i]?.bool_value === 0 ? (
              <>
                <div style={{ marginTop: 20 + "px" }}>
                  <input
                    type="file"
                    id={"file-" + el.type}
                    multiple
                    disabled={disabled ? true : false}
                  />
                  <label
                    className="p__drop-content download-file"
                    htmlFor={"file-" + el.type}
                  >
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
                  <div className="bool-number">
                    <div className="counterparty__radio-input">
                      <input
                        type="radio"
                        disabled={disabled ? true : false}
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
                            contractTaskOptionsNow[i]?.value === "Да" ||
                            contractTaskOptions[i]?.value === "Да"
                              ? "we-supply__radio for"
                              : "we-supply__radio"
                          }
                          htmlFor="create-treaty-yes"
                        ></label>
                        <label htmlFor="create-treaty-yes">Да</label>
                      </div>
                    </div>
                    <div className="counterparty__radio-input">
                      <input
                        type="radio"
                        disabled={disabled ? true : false}
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
                            contractTaskOptionsNow[i]?.value === "Нет" ||
                            contractTaskOptions[i]?.value === "Нет"
                              ? "we-supply__radio for"
                              : "we-supply__radio"
                          }
                          htmlFor="create-treaty-no"
                        ></label>
                        <label htmlFor="create-treaty-no">Нет</label>
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
            {!!contractTaskOptions[i]?.value}
            <TextareaAutosize
              minRows={4}
              className="input-form input-full"
              placeholder={el.name}
              disabled={disabled ? true : false}
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
              disabled={disabled ? true : false}
              value={
                !!contractTaskOptions[i]?.value
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
              {!!contractTaskOptions[i]?.value ? (
                <option value={contractTaskOptions[i]?.value}>
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
            <label className="p__drop-content" htmlFor={"file-" + i}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              {el.name}
            </label>

            {contractTaskOptions[i]?.files.length > 0 ? (
              contractTaskOptions[i].files.map((el) => {
                return (
                  <div className="file-download" key={el.file.id}>
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
                  onChange={(e) => sendFile(e, contractTaskOptions[i].id)}
                  disabled={disabled ? true : false}
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
            <div className="bool-number">
              {el.variables.map((item, index) => {
                return (
                  <div className="counterparty__radio-input" key={index}>
                    <input
                      type="radio"
                      id={item + "-" + i}
                      name={"counterparty-" + el.name}
                      style={{ display: "none" }}
                      disabled={disabled ? true : false}
                      value={
                        !!contractTaskOptions[i]?.bool_value
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
                            bool_value: parseInt(e.target.value),
                          },
                        });
                      }}
                    />
                    <div className="radio-counterparty">
                      <label
                        htmlFor={item + "-" + i}
                        id={item + "-" + i + "-for"}
                        className={
                          contractTaskOptionsNow[i]?.bool_value === index ||
                          contractTaskOptions[i]?.bool_value === index
                            ? "we-supply__radio for"
                            : "we-supply__radio"
                        }
                      ></label>
                      <label htmlFor={item + "-" + i}>{item}</label>
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
                disabled={disabled ? true : false}
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
                  <div className="counterparty__radio-input" key={index}>
                    <input
                      type="radio"
                      id={item + "-" + i}
                      name={"counterparty-" + el.name}
                      style={{ display: "none" }}
                      disabled={disabled ? true : false}
                      value={
                        !!contractTaskOptions[i]?.bool_value
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
                            bool_value: parseInt(e.target.value),
                          },
                        });
                      }}
                    />
                    <div className="radio-counterparty">
                      <label
                        htmlFor={item + "-" + i}
                        id={item + "-" + i + "-for"}
                        className={
                          contractTaskOptionsNow[i]?.bool_value === index ||
                          contractTaskOptions[i]?.bool_value === index
                            ? "we-supply__radio for"
                            : "we-supply__radio"
                        }
                      ></label>
                      <label htmlFor={item + "-" + i}>{item}</label>
                    </div>
                  </div>
                );
              })}
              {contractTaskOptionsNow[i]?.bool_value === 0 ? (
                <>
                  {contractTaskOptions[i].files.length > 0 ? (
                    contractTaskOptions[i].files.map((el) => {
                      return (
                        <div className="file-download" key={el.file.id}>
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
                        onChange={(e) => sendFile(e, contractTaskOptions[i].id)}
                        disabled={disabled ? true : false}
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
                  <div className="counterparty__radio-input" key={index}>
                    <input
                      type="radio"
                      id={item + "-" + i}
                      name={"counterparty-" + el.name}
                      style={{ display: "none" }}
                      disabled={disabled ? true : false}
                      value={
                        !!contractTaskOptions[i]?.bool_value
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
                            bool_value: parseInt(e.target.value),
                          },
                        });
                      }}
                    />
                    <div className="radio-counterparty">
                      <label
                        htmlFor={item + "-" + i}
                        id={item + "-" + i + "-for"}
                        className={
                          contractTaskOptionsNow[i]?.bool_value === index ||
                          contractTaskOptions[i]?.bool_value === index
                            ? "we-supply__radio for"
                            : "we-supply__radio"
                        }
                      ></label>
                      <label htmlFor={item + "-" + i}>{item}</label>
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
                    disabled={disabled ? true : false}
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
                          value: e.target.value,
                        },
                      });
                    }}
                  />
                  {contractTaskOptions[i].files.length > 0 ? (
                    contractTaskOptions[i].files.map((el) => {
                      return (
                        <div className="file-download" key={el.file.id}>
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
                        onChange={(e) => sendFile(e, contractTaskOptions[i].id)}
                        disabled={disabled ? true : false}
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
              disabled={disabled ? true : false}
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
              disabled={disabled ? true : false}
              value={
                !!contractTaskOptions[i]?.value
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
              {!!contractTaskOptions[i]?.value ? (
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
              disabled={disabled ? true : false}
              value={
                !!contractTaskOptions[i]?.value
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
              {!!contractTaskOptions[i]?.value ? (
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
                      <div className="file-download" key={el.file.id}>
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
                      onChange={(e) => sendFile(e, contractTaskOptions[i].id)}
                      disabled={disabled ? true : false}
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
        console.log(el, " ", i);
      }
      if (el.type === 18) {
        console.log(el, " ", i);
      }
      if (el.type === 19) {
        console.log(el, " ", i);
      }
      if (el.type === 20) {
        console.log(el, " ", i);
      }
      if (el.type === 21) {
        console.log(el, " ", i);
      }
      if (el.type === 22) {
        console.log(el, " ", i);
      }
      if (el.type === 23) {
        console.log(el, " ", i);
      }
      if (el.type === 24) {
        console.log(el, " ", i);
      }
    })
  ) : (
    <></>
  );
};
export default Result;
