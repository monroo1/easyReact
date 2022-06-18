import React, { useContext } from "react";
import { useState } from "react";
import { StatusContext } from "../../context/status";
import TextareaAutosize from "react-textarea-autosize";
import "./BpResultFormTreaty.scss";

const BpResultFormTreaty = () => {
  const { openForm } = useContext(StatusContext);
  const [formContract, setFormContract] = useState();
  const [newTreaty, setNewTreaty] = useState();
  const [typeContract, setTypeContract] = useState();
  const [supply, setSupply] = useState();

  if (openForm === "form1") {
    return (
      <div className="business__drop-content">
        <div id="business" className="businessClass">
          <div>
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
                <select className="input-form">
                  <option>Коммерческое подразделение</option>
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
                  onChange={(e) => setTypeContract(e.target.value)}
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
                      onClick={(e) => setSupply(e.target.value)}
                    />
                    <label
                      htmlFor="we-supply"
                      className="we-supply__radio"
                    ></label>
                    <label htmlFor="we-supply">Мы поставляем</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="we-supplied"
                      name="we-supply"
                      value="false"
                      onClick={(e) => setSupply(e.target.value)}
                    />
                    <label
                      htmlFor="we-supplied"
                      className="we-supply__radio"
                    ></label>
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
                <select className="input-form">
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
                <select className="input-form">
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
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="counterparty-no"
                      name="counterparty"
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
                      onClick={(e) => setFormContract(e.target.value)}
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
                      onClick={(e) => setFormContract(e.target.value)}
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
                          onClick={(e) => setNewTreaty(e.target.value)}
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
                          onClick={(e) => setNewTreaty(e.target.value)}
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
                    <select className="input-form">
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
                    <select className="input-form">
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
                    <input type="file" id="anketa" />
                    <label
                      className="p__drop-content download-file"
                      htmlFor="anketa"
                    >
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
                      <input type="file" id="reporting-previous-year" />
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
                      <input type="file" id="reporting-previous-year" />
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
                      <input type="file" id="reporting-previous-year" />
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
                    <input type="file" id="project-treaty" />
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
                    <input type="file" id="reporting-previous-year" />
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
          </div>
          <div>
            <button className="blue-btn blue-btn__disabled" id="bussines-next">
              Далее
            </button>
            <button className="defualt__btn" id="close-btn">
              Отмена
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default BpResultFormTreaty;
