import React, { useContext, useState, useEffect } from "react";
import { StatusContext } from "../../context/status";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import "./BpResultFormWork.scss";

const BpResultFormWork = () => {
  const { createBpSampleFormOptions, setCreateBpSampleFormOptions, apiBp } =
    useContext(StatusContext);
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
    if (paramsId === 12) {
      setCreateBpSampleFormOptions({
        ...createBpSampleFormOptions,
        12: { optionId: 12, fileId: fileId },
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
          Новая/существующая позиция
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
          <option>Существующая позиция</option>
          <option>Несуществующая позиция</option>
        </select>
      </div>
      <div className="input-form__short">
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Оклад
        </label>
        <input
          className="input-form"
          type="number"
          placeholder="56 000"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              2: { optionId: 2, value: e.target.value },
            });
          }}
        />
      </div>
      <div className="input-form__short">
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Оклад
        </label>
        <input
          className="input-form"
          type="number"
          placeholder="56 000"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              3: { optionId: 3, value: e.target.value },
            });
          }}
        />
      </div>
      <div className="input-form__short">
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Оклад
        </label>
        <input
          className="input-form"
          type="number"
          placeholder="56 000"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              4: { optionId: 4, value: e.target.value },
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
          Формат взаимоотношений
        </label>
        <select
          className="input-form"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              5: { optionId: 5, value: e.target.value },
            });
          }}
        >
          <option>ГПХ-ТД</option>
          <option>СМЗ</option>
          <option>ИП</option>
          <option>вне штата</option>
        </select>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Формат взаимоотношений
        </label>
        <TextareaAutosize
          minRows={3}
          className="input-form"
          placeholder="Поставка осуществляется в срок 5 дней подписания договора"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              6: { optionId: 6, value: e.target.value },
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
          Обязанности
        </label>
        <TextareaAutosize
          minRows={3}
          className="input-form"
          placeholder="Поставка осуществляется в срок 5 дней подписания договора"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              7: { optionId: 7, value: e.target.value },
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
          График работы
        </label>
        <TextareaAutosize
          minRows={3}
          className="input-form"
          placeholder="Поставка осуществляется в срок 5 дней подписания договора"
          onChange={(e) => {
            setCreateBpSampleFormOptions({
              ...createBpSampleFormOptions,
              8: { optionId: 8, value: e.target.value },
            });
          }}
        ></TextareaAutosize>
        <div style={{ marginTop: 20 + "px" }}>
          <input
            type="file"
            id="schedule"
            data-id="9"
            onChange={(e) => {
              sendFile(e);
            }}
          />
          <label className="p__drop-content download-file" htmlFor="schedule">
            <img
              src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
              alt="download"
            />
            Прикрепить файл
          </label>
        </div>
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`}
            alt="Article"
          />
          Прикрепление документов
        </label>
        <div className="doc-list">
          <label className="p__drop-content">ГПХ/ТД:</label>
          <input
            type="file"
            id="GPC"
            data-id="10"
            onChange={(e) => {
              sendFile(e);
            }}
          />
          <label className="p__drop-content download-file" htmlFor="GPC">
            <img
              src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
              alt="download"
            />
            Прикрепить файл
          </label>
        </div>
        <div className="doc-list">
          <label className="p__drop-content">СМЗ:</label>
          <input
            type="file"
            id="smz"
            data-id="11"
            onChange={(e) => {
              sendFile(e);
            }}
          />
          <label className="p__drop-content download-file" htmlFor="smz">
            <img
              src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
              alt="download"
            />
            Прикрепить файл
          </label>
        </div>
        <div className="doc-list">
          <label className="p__drop-content">ИП:</label>
          <input
            type="file"
            id="ip"
            data-id="12"
            onChange={(e) => {
              sendFile(e);
            }}
          />
          <label className="p__drop-content download-file" htmlFor="ip">
            <img
              src={`${process.env.PUBLIC_URL}/assets/FilePlus.svg`}
              alt="download"
            />
            Прикрепить файл
          </label>
        </div>
      </div>
    </form>
  );
};

export default BpResultFormWork;
