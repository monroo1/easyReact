import React, { useState, useContext, useEffect } from "react";
import { StatusContext } from "../../context/status";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import "./BpResultFormDismissal.scss";

const BpResultFormDismissal = () => {
  const { createBpSampleFormOptions, setCreateBpSampleFormOptions, apiBp } =
    useContext(StatusContext);
  const [relationshipFormat, setRelationshipFormat] = useState("");
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
    if (paramsId === 5) {
      setCreateBpSampleFormOptions({
        ...createBpSampleFormOptions,
        5: { optionId: 5, fileId: fileId },
      });
    }
    if (paramsId === 8) {
      setCreateBpSampleFormOptions({
        ...createBpSampleFormOptions,
        8: { optionId: 8, fileId: fileId },
      });
    }
    if (paramsId === 9) {
      setCreateBpSampleFormOptions({
        ...createBpSampleFormOptions,
        9: { optionId: 9, fileId: fileId },
      });
    }
    if (paramsId === 10) {
      setCreateBpSampleFormOptions({
        ...createBpSampleFormOptions,
        10: { optionId: 10, fileId: fileId },
      });
    }
    if (paramsId === 11) {
      setCreateBpSampleFormOptions({
        ...createBpSampleFormOptions,
        11: { optionId: 11, fileId: fileId },
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
          Сотрудник
        </label>
        <select
          className="input-form"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              1: { optionId: 1, value: e.target.value },
            });
          }}
        >
          <option>Выбрать</option>
          <option>Иванов И.И.</option>
        </select>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Работодатель
        </label>
        <TextareaAutosize
          minRows={3}
          className="input-form"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              2: { optionId: 2, value: e.target.value },
            });
          }}
        ></TextareaAutosize>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Формат взаимоотношений
        </label>
        <select
          className="input-form"
          onChange={(e) => {
            setRelationshipFormat(e.target.value);
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              3: { optionId: 3, value: e.target.value },
            });
          }}
        >
          <option value={""}>Выбрать</option>
          <option value={"ГПХ-ТД"}>ГПХ-ТД</option>
          <option value={"ТД"}>ТД</option>
          <option value={"СМЗ"}>СМЗ</option>
          <option value={"ИП"}>ИП</option>
          <option value={"вне штата"}>вне штата</option>
        </select>
      </div>
      {relationshipFormat === "ТД" ? (
        <>
          <div>
            <label className="p__drop-content">
              <img
                src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
                alt="Article"
              />
              Основание для увольнения
            </label>
            <select
              className="input-form"
              onChange={(e) => {
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  4: { optionId: 4, value: e.target.value },
                });
              }}
            >
              <option>Заявление на увольнение прикрепить скан (поле);</option>
              <option>
                Соглашение сторон доп. поле с указанием дружественное/не
                дружественное;
              </option>
              <option>
                Сокращение доп. поле с указанием дружественное/не дружественное;
              </option>
              <option>
                Статья прикрепить сканы обосновывающих документов (поле);
              </option>
            </select>
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
              Заявление на увольнение
            </label>
            <input
              type="file"
              id="reporting-previous-year"
              data-id="5"
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
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Соглашение сторон
        </label>
        <div className="we-supply">
          <div>
            <input
              type="radio"
              id="we-supply"
              name="we-supply"
              onClick={() => {
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  6: { optionId: 6, boolValue: true },
                });
              }}
            />
            <label htmlFor="we-supply" className="we-supply__radio"></label>
            <label htmlFor="we-supply">Дружественное</label>
          </div>
          <div>
            <input
              type="radio"
              id="we-supplied"
              name="we-supply"
              onClick={() => {
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  6: { optionId: 6, boolValue: false },
                });
              }}
            />
            <label htmlFor="we-supplied" className="we-supply__radio"></label>
            <label htmlFor="we-supplied">Не дружественное</label>
          </div>
        </div>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Сокращение
        </label>
        <div className="we-supply">
          <div>
            <input
              type="radio"
              id="we-supply"
              name="we-supply"
              onClick={() => {
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  7: { optionId: 7, boolValue: true },
                });
              }}
            />
            <label htmlFor="we-supply" className="we-supply__radio"></label>
            <label htmlFor="we-supply">Дружественное</label>
          </div>
          <div>
            <input
              type="radio"
              id="we-supplied"
              name="we-supply"
              onClick={() => {
                setCreateBpSampleFormOptions({
                  ...createBpSampleFormOptions,
                  7: { optionId: 7, boolValue: false },
                });
              }}
            />
            <label htmlFor="we-supplied" className="we-supply__radio"></label>
            <label htmlFor="we-supplied">Не дружественное</label>
          </div>
        </div>
      </div>
      <div>
        <label className="p__drop-content" htmlFor="reporting-previous-year">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Статья
        </label>
        <input
          type="file"
          id="reporting-previous-year"
          data-id="8"
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
      {relationshipFormat === "ГПХ" ? (
        <div>
          <label className="p__drop-content" htmlFor="reporting-previous-year">
            <img
              src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
              alt="Article"
            />
            Соглашение о расторжении договора ГПХ
          </label>
          <input
            type="file"
            id="reporting-previous-year"
            data-id="9"
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
      ) : (
        <></>
      )}
      {relationshipFormat === "СМЗ" || "ИП" ? (
        <div>
          <label className="p__drop-content" htmlFor="reporting-previous-year">
            <img
              src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
              alt="Article"
            />
            Соглашение о расторжении ДОУ
          </label>
          <input
            type="file"
            id="reporting-previous-year"
            data-id="10"
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
      ) : (
        <></>
      )}
      {relationshipFormat === "вне штата" ? (
        <div>
          <label className="p__drop-content" htmlFor="reporting-previous-year">
            <img
              src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
              alt="Article"
            />
            Внутренний обходной лист, подписанный руководителем, скан (поле)
          </label>
          <input
            type="file"
            id="reporting-previous-year"
            data-id="11"
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
      ) : (
        <></>
      )}

      <div className="input__date">
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
            alt="CalendarBlank"
          />
          Общий срок
        </label>
        <div>
          <input
            className="input-form"
            type="date"
            onChange={(e) => {
              setCreateBpSampleFormOptions({
                ...createBpSampleFormOptions,
                12: { optionId: 12, value: e.target.value },
              });
            }}
          />
        </div>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Комментарии
        </label>
        <TextareaAutosize
          minRows={3}
          className="input-form"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              13: { optionId: 13, value: e.target.value },
            });
          }}
        ></TextareaAutosize>
      </div>
    </form>
  );
};

export default BpResultFormDismissal;
