import "./CreateTaskForm.scss";

const CreateTaskForm = () => {
  return (
    <form id="new-bp__form">
      <div>
        <label className="p__drop-content" htmlFor="input-name-Task">
          <img src={`${process.env.PUBLIC_URL}/assets/input/Article.svg`} />
          Нименование задачи*
        </label>
        <input
          className="input-form input-name-task__list"
          type="text"
          id="input-name-task"
        />
      </div>
      <div>
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/NewspaperClipping.svg`}
          />
          Описание
        </label>
        <div className="input-form" id="businessTask__description">
          <div>
            <label htmlFor="businessTask__description__what">
              Что нужно сделать:{" "}
            </label>
            <input type="text" id="businessTask__description__what" />
          </div>
          <div>
            <label htmlFor="businessTask__description__as">
              Как нужно сделать:
            </label>
            <input type="text" id="businessTask__description__as" />
          </div>
          <div>
            <label htmlFor="businessTask__description__result">
              Какой должен быть результат:{" "}
            </label>
            <input type="text" id="businessTask__description__result" />
          </div>
        </div>
      </div>
      <div>
        <label className="p__drop-content" htmlFor="businessTask__executor">
          <img src={`${process.env.PUBLIC_URL}/assets/input/User.svg`} />
          Исполнитель
        </label>
        <input className="input-form" type="text" id="businessTask__executor" />
      </div>
      <div className="input__date">
        <label className="p__drop-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
          />
          Дата и время начала
        </label>
        <div>
          <input
            className="input-form"
            type="date"
            id="businessTask__date-start"
            htmlFor="businessTask__date-start"
          />
          <input className="input-form" type="time" />
        </div>
      </div>
      <div className="input__date">
        <label className="p__drop-content" htmlFor="businessTask__date-end">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/CalendarBlank.svg`}
          />
          Дата и время окончания
        </label>
        <div>
          <input
            className="input-form"
            type="date"
            id="businessTask__date-end"
          />
          <input className="input-form" type="time" />
        </div>
      </div>
      <div>
        <label className="p__drop-content" htmlFor="businessTask__dependencies">
          <img
            src={`${process.env.PUBLIC_URL}/assets/input/ArrowUDownRight.svg`}
          />
          Зависимости
        </label>
        <input
          className="input-form"
          type="text"
          id="businessTask__dependencies"
        />
      </div>
    </form>
  );
};

export default CreateTaskForm;
