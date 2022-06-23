import React, { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../context/status";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import "./BpResultFormTreaty.scss";

const BpResultFormTreaty = () => {
  const { createBpSampleFormOptions, setCreateBpSampleFormOptions, apiBp } =
    useContext(StatusContext);
  const [formContract, setFormContract] = useState();
  const [newTreaty, setNewTreaty] = useState();
  const [typeContract, setTypeContract] = useState();
  const [supply, setSupply] = useState();
  const [fileId, setFileId] = useState(0);
  const [paramsId, setParamsId] = useState(0);

  const sendFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axios
      .post(`${apiBp}/loadFile`, formData, {
        headers: {
          "secret-token": document.cookie.replace(
            /(?:(?:^|.*;\s*)access_token_jwt\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
        },
      })
      .then((res) => {
        setParamsId(parseInt(e.target.dataset.id));
        setFileId(parseInt(res.data.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (paramsId === 22) {
      setCreateBpSampleFormOptions({
        ...createBpSampleFormOptions,
        22: { optionId: 22, fileId: fileId },
      });
    }
    if (paramsId === 23) {
      setCreateBpSampleFormOptions({
        ...createBpSampleFormOptions,
        23: { optionId: 23, fileId: fileId },
      });
    }
    if (paramsId === 24) {
      setCreateBpSampleFormOptions({
        ...createBpSampleFormOptions,
        24: { optionId: 24, fileId: fileId },
      });
    }
    if (paramsId === 25) {
      setCreateBpSampleFormOptions({
        ...createBpSampleFormOptions,
        25: { optionId: 25, fileId: fileId },
      });
    }
    if (paramsId === 26) {
      setCreateBpSampleFormOptions({
        ...createBpSampleFormOptions,
        26: { optionId: 26, fileId: fileId },
      });
    }
    if (paramsId === 27) {
      setCreateBpSampleFormOptions({
        ...createBpSampleFormOptions,
        27: { optionId: 27, fileId: fileId },
      });
    }
  }, [fileId, paramsId]);

  return (
    <form id="new-bp__form">
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Тип договора
        </label>
        <input
          className="input-form"
          type="text"
          placeholder="Аренда"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              1: { optionId: 1, value: e.target.value },
            });
          }}
        />
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Наименование договора
        </label>
        <input
          className="input-form"
          type="text"
          placeholder="ООО &#34;Ромашка&#34; Договор аренды"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              2: { optionId: 2, value: e.target.value },
            });
          }}
        />
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Подразделение Инициатора
        </label>
        <select
          className="input-form"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              3: { optionId: 3, value: e.target.value },
            });
          }}
        >
          <option value={"Коммерческое подразделение"}>
            Коммерческое подразделение
          </option>
          <option value={"Подразделение"}>Подразделение</option>
        </select>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Вид договора
        </label>
        <select
          className="input-form"
          onChange={(e) => {
            setTypeContract(e.target.value);
            if (e.target.value !== "text") {
              setCreateBpSampleFormOptions({
                ...createBpSampleFormOptions,
                4: { optionId: 4, value: e.target.value },
              });
            } else {
              setCreateBpSampleFormOptions({
                ...createBpSampleFormOptions,
                4: {},
              });
            }
          }}
        >
          <option>Аренда</option>
          <option>Поставка</option>
          <option>Купля-продажа</option>
          <option>Подряд</option>
          <option>Оказание услуг</option>
          <option>Факторинг</option>
          <option>Лизинг</option>
          <option value={"text"}>Другое (указать)</option>
        </select>
        {typeContract === "text" ? (
          <input
            className="input-form"
            type="text"
            placeholder="Вид договора"
            style={{ marginTop: 20 + "px" }}
            onChange={(e) =>
              setCreateBpSampleFormOptions({
                ...createBpSampleFormOptions,
                4: { optionId: 4, value: e.target.value },
              })
            }
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Мы поставляем/нам поставляют
        </label>
        <div className="we-supply">
          <div>
            <input
              type="radio"
              id="we-supply"
              name="we-supply"
              value="true"
              onClick={(e) => {
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  5: { optionId: 5, boolValue: true },
                  7: {},
                });
                setSupply(e.target.value);
              }}
            />
            <label htmlFor="we-supply" className="we-supply__radio"></label>
            <label htmlFor="we-supply">Мы поставляем</label>
          </div>
          <div>
            <input
              type="radio"
              id="we-supplied"
              name="we-supply"
              value="false"
              onClick={(e) => {
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  5: { optionId: 5, boolValue: false },
                  6: {},
                });
                setSupply(e.target.value);
              }}
            />
            <label htmlFor="we-supplied" className="we-supply__radio"></label>
            <label htmlFor="we-supplied">Нам поставляют</label>
          </div>
        </div>
      </div>
      {supply === "true" ? (
        <div className="input-form__short">
          <label className="p__drop-content">
            <img
              src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
              alt="Article"
            />
            Планируемый ежемесячный доход
          </label>
          <input
            className="input-form"
            type="number"
            placeholder="56 000"
            onChange={(e) =>
              setCreateBpSampleFormOptions({
                ...createBpSampleFormOptions,
                6: { optionId: 6, value: e.target.value },
              })
            }
          />
        </div>
      ) : (
        <></>
      )}
      {supply === "false" ? (
        <div className="input-form__short">
          <label className="p__drop-content">
            <img
              src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
              alt="Article"
            />
            Планируемый ежемесячный расход
          </label>
          <input
            className="input-form"
            type="number"
            placeholder="63 000"
            onChange={(e) =>
              setCreateBpSampleFormOptions({
                ...createBpSampleFormOptions,
                7: { optionId: 7, value: e.target.value },
              })
            }
          />
        </div>
      ) : (
        <></>
      )}

      <div className="input-form__short">
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Сумма по договору
        </label>
        <input
          className="input-form"
          type="number"
          placeholder="680 000"
          onChange={(e) =>
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              8: { optionId: 8, value: e.target.value },
            })
          }
        />
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Вид налогообложения
        </label>
        <select
          className="input-form"
          onChange={(e) =>
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              9: { optionId: 9, value: e.target.value },
            })
          }
        >
          <option>Выбрать</option>
          <option>Налог на проф. доход (самозанятый)</option>
        </select>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Организация, заключающая договор с нашей стороны
        </label>
        <select
          className="input-form"
          onChange={(e) =>
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              10: { optionId: 10, value: e.target.value },
            })
          }
        >
          <option>Выбрать</option>
          <option>ООО Ромашка</option>
        </select>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Контрагент существующий
        </label>
        <div className="we-supply">
          <div className="counterparty__radio-input">
            <input
              type="radio"
              id="counterparty-yes"
              name="counterparty"
              onChange={(e) =>
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  11: { optionId: 11, boolValue: true },
                })
              }
            />
            <div className="radio-counterparty">
              <label
                htmlFor="counterparty-yes"
                className="we-supply__radio"
              ></label>
              <label htmlFor="counterparty-yes">Да</label>
            </div>
            <div className="input-short__radio">
              <label className="p__drop-content">
                Номер задач предыдущего договора с данным контрагентом
              </label>
              <input
                className="input-form"
                type="text"
                placeholder="35-2873-20022-06-07"
                onChange={(e) =>
                  setCreateBpSampleFormOptions({
                    ...createBpSampleFormOptions,
                    12: { optionId: 12, value: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div>
            <input
              type="radio"
              id="counterparty-no"
              name="counterparty"
              onChange={(e) =>
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  11: { optionId: 11, boolValue: false },
                })
              }
            />
            <label
              htmlFor="counterparty-no"
              className="we-supply__radio"
            ></label>
            <label htmlFor="counterparty-no">Нет</label>
          </div>
        </div>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Чья форма договора?
        </label>
        <div className="we-supply">
          <div>
            <input
              type="radio"
              id="form-contract__our"
              name="form-contract"
              value="our"
              onClick={(e) => {
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  13: { optionId: 13, boolValue: true },
                });
                setFormContract(e.target.value);
              }}
            />
            <label
              htmlFor="form-contract__our"
              className="we-supply__radio"
            ></label>
            <label htmlFor="form-contract__our">Наша</label>
          </div>
          <div>
            <input
              type="radio"
              id="form-contract__them"
              name="form-contract"
              value="counterparty"
              onClick={(e) => {
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  13: { optionId: 13, boolValue: false },
                  14: {},
                  15: {},
                  16: {},
                  17: {},
                  18: {},
                  19: {},
                  20: {},
                  21: {},
                  22: {},
                  23: {},
                  24: {},
                  25: {},
                  26: {},
                });
                setFormContract(e.target.value);
              }}
            />
            <label
              htmlFor="form-contract__them"
              className="we-supply__radio"
            ></label>
            <label htmlFor="form-contract__them">Контрагента</label>
          </div>
        </div>
      </div>

      {formContract === "our" ? (
        <>
          <div>
            <label className="p__drop-content">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              Создать договор с нуля
            </label>
            <div className="we-supply">
              <div>
                <input
                  type="radio"
                  id="create-contract__yes"
                  name="create-contract"
                  value="true"
                  onClick={(e) => {
                    setCreateBpSampleFormOptions({
                      ...createBpSampleFormOptions,
                      14: { optionId: 14, boolValue: true },
                    });
                    setNewTreaty(e.target.value);
                  }}
                />
                <label
                  htmlFor="create-contract__yes"
                  className="we-supply__radio"
                ></label>
                <label htmlFor="create-contract__yes">Да</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="create-contract__no"
                  name="create-contract"
                  value="false"
                  onClick={(e) => {
                    setCreateBpSampleFormOptions({
                      ...createBpSampleFormOptions,
                      14: { optionId: 14, boolValue: false },
                      16: {},
                      17: {},
                      18: {},
                      19: {},
                      20: {},
                      21: {},
                      22: {},
                      23: {},
                      24: {},
                      25: {},
                      26: {},
                    });
                    setNewTreaty(e.target.value);
                  }}
                />
                <label
                  htmlFor="create-contract__no"
                  className="we-supply__radio"
                ></label>
                <label htmlFor="create-contract__no">Нет</label>
              </div>
            </div>
          </div>
          <div>
            <label className="p__drop-content">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              Тип договора
            </label>
            <select
              className="input-form"
              onChange={(e) =>
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  15: { optionId: 15, value: e.target.value },
                })
              }
            >
              <option>С покупателем</option>
              <option>С поставщиком</option>
              <option>Договор комиссии</option>
            </select>
          </div>
        </>
      ) : (
        <></>
      )}

      {newTreaty === "true" ? (
        <>
          <div>
            <label className="p__drop-content">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              О чем договорились с контрагентом
            </label>
            <TextareaAutosize
              minRows={3}
              className="input-form"
              placeholder="Поставка осуществляется в срок 5 дней подписания договора"
              onChange={(e) =>
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  16: { optionId: 16, value: e.target.value },
                })
              }
            ></TextareaAutosize>
          </div>
          <div>
            <label className="p__drop-content">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              Вид взаиморасчетов
            </label>
            <select
              className="input-form"
              onChange={(e) =>
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  17: { optionId: 17, value: e.target.value },
                })
              }
            >
              <option>Выбрать</option>
              <option>Предоплата</option>
            </select>
          </div>
          <div>
            <label className="p__drop-content">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              Другие существенные условия (опционально)
            </label>
            <TextareaAutosize
              minRows={3}
              className="input-form"
              placeholder="Опишите условия"
              onChange={(e) =>
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  18: { optionId: 18, value: e.target.value },
                })
              }
            ></TextareaAutosize>
          </div>
          <div>
            <label className="p__drop-content">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              О чем договорились с контрагентом
            </label>
            <TextareaAutosize
              minRows={3}
              className="input-form"
              placeholder="Суть договоренностей между инициатором и контактным лицом контрагента – что наша сторона получает в результате данного договора."
              onChange={(e) =>
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  19: { optionId: 19, value: e.target.value },
                })
              }
            ></TextareaAutosize>
          </div>
          <div>
            <label className="p__drop-content">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              Кредитный лимит
            </label>
            <div className="we-supply">
              <div>
                <input
                  type="radio"
                  id="credit-limit-yes"
                  name="credit"
                  onClick={(e) => {
                    setCreateBpSampleFormOptions({
                      ...createBpSampleFormOptions,
                      20: { optionId: 20, boolValue: true },
                    });
                  }}
                />
                <label
                  htmlFor="credit-limit-yes"
                  className="we-supply__radio"
                ></label>
                <label htmlFor="credit-limit-yes">Присутствует</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="credit-limit-no"
                  name="credit"
                  onClick={(e) => {
                    setCreateBpSampleFormOptions({
                      ...createBpSampleFormOptions,
                      20: { optionId: 20, boolValue: false },
                    });
                  }}
                />
                <label
                  htmlFor="credit-limit-no"
                  className="we-supply__radio"
                ></label>
                <label htmlFor="credit-limit-no">Отсутствует</label>
              </div>
              <div className="credit-limit-specify">
                <input
                  type="radio"
                  id="credit-limit-specify"
                  name="credit"
                  onClick={(e) => {
                    setCreateBpSampleFormOptions({
                      ...createBpSampleFormOptions,
                      20: {},
                    });
                  }}
                />
                <div className="radio-counterparty">
                  <label
                    htmlFor="credit-limit-specify"
                    className="we-supply__radio"
                  ></label>
                  <label htmlFor="credit-limit-specify">Указать</label>
                </div>
                <div className="input-short__radio" id="credit-sum">
                  <input
                    className="input-form"
                    type="number"
                    placeholder="376 000"
                    onChange={(e) =>
                      setCreateBpSampleFormOptions({
                        ...createBpSampleFormOptions,
                        21: { optionId: 21, value: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="p__drop-content" htmlFor="anketa">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              Анкета
            </label>
            <input
              type="file"
              id="anketa"
              data-id="22"
              onChange={(e) => {
                sendFile(e);
              }}
            />
            <label className="p__drop-content download-file" htmlFor="anketa">
              <img
                src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                alt="download"
              />
              Прикрепить файл
            </label>
          </div>
          <div>
            <label className="p__drop-content">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              Учредительные документы
            </label>
            <div className="doc-list">
              <label className="p__drop-content">Устав:</label>
              <input
                type="file"
                id="reporting-previous-year"
                data-id="23"
                onChange={(e) => {
                  sendFile(e);
                }}
              />
              <label
                className="p__drop-content download-file"
                htmlFor="reporting-previous-year"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                  alt="download"
                />
                Прикрепить файл
              </label>
            </div>
            <div className="doc-list">
              <label className="p__drop-content">
                Решение/протокол о назначении генерального директора:
              </label>
              <input
                type="file"
                id="reporting-previous-year"
                data-id="24"
                onChange={(e) => {
                  sendFile(e);
                }}
              />
              <label
                className="p__drop-content download-file"
                htmlFor="reporting-previous-year"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                  alt="download"
                />
                Прикрепить файл
              </label>
            </div>
            <div className="doc-list">
              <label className="p__drop-content">Доверенность:</label>
              <input
                type="file"
                id="reporting-previous-year"
                data-id="25"
                onChange={(e) => {
                  sendFile(e);
                }}
              />
              <label
                className="p__drop-content download-file"
                htmlFor="reporting-previous-year"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                  alt="download"
                />
                Прикрепить файл
              </label>
            </div>
          </div>
          <div>
            <label className="p__drop-content" htmlFor="project-treaty">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              Проект договора с заполненными реквизитами обеих сторон
            </label>
            <input
              type="file"
              id="project-treaty"
              data-id="26"
              onChange={(e) => {
                sendFile(e);
              }}
            />
            <label
              className="p__drop-content download-file"
              htmlFor="project-treaty"
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                alt="download"
              />
              Прикрепить файл
            </label>
          </div>
          <div>
            <label
              className="p__drop-content"
              htmlFor="reporting-previous-year"
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              Отчетность контрагента за предыдущий год
            </label>
            <input
              type="file"
              id="reporting-previous-year"
              data-id="27"
              onChange={(e) => {
                sendFile(e);
              }}
            />
            <label
              className="p__drop-content download-file"
              htmlFor="reporting-previous-year"
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
                alt="download"
              />
              Прикрепить файл
            </label>
          </div>
        </>
      ) : (
        <></>
      )}
    </form>
  );
};

export default BpResultFormTreaty;
