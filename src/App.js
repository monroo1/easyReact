import "./App.css";
import React, { useState } from "react";
import { StatusContext } from "./context/status";
import Header from "./components/header/Header";
import BusinessMain from "./components/business-main/BusinessMain";
import LeftNav from "./components/left-nav/LeftNav.jsx";
import "./components/left-nav/LeftNav.jsx";

function App() {
  const [createBpStatus, setCreateBpStatus] = useState(false);
  const [createBpForm, setCreateBpForm] = useState({
    name: null,
    initiator_id: document.cookie.replace(
      /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    ),
    project_id: null,
    deadlineDate: null,
    deadlineTime: "00:00:00",
    tasks: null,
    sample: null,
    file_id: null,
    deadline: null,
  });
  const [createTaskFormDate, setCreateTaskFormDate] = useState({
    beginDate: "13-01-2021 ",
    beginTime: "12:54:05",
    endDate: "15-01-2022 ",
    endTime: "13:54:05",
  });
  const [createTaskForm, setCreateTaskForm] = useState({
    name: "цикл 1",
    description: "ww",
    begin: "13-01-2021 12:54:05",
    end: "15-01-2022 13:54:05",
    project_id: 35,
    cyclic_task_id: 0,
    project_section_id: 124,
    executor_id: 512,

    next_id: null,
    parent_id: null,
    prev_id: null,

    priority_id: 2,
    provide_to: 0,
    status_id: 2,
    task_load: 5,
    work_load: 35,
    workflow_id: 1,
  });
  const [filter, setFilter] = useState("id");
  const [filterMethod, setFilterMethod] = useState("asc");
  const [openTasks, setOpenTasks] = useState("");
  const [idBp, setIdBp] = useState("");
  const [bearer, setBearer] = useState(
    document.cookie.replace(
      /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    )
  );
  const [createTaskStatus, setCreateTaskStatus] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [nowBp, setNowBp] = useState();

  return (
    <StatusContext.Provider
      value={{
        createBpStatus,
        setCreateBpStatus,
        createTaskStatus,
        setCreateTaskStatus,
        createBpForm,
        setCreateBpForm,
        createTaskForm,
        setCreateTaskForm,
        filter,
        setFilter,
        filterMethod,
        setFilterMethod,
        openTasks,
        setOpenTasks,
        idBp,
        setIdBp,
        bearer,
        tasksList,
        setTasksList,
        createTaskFormDate,
        setCreateTaskFormDate,
        nowBp,
        setNowBp,
      }}
    >
      <div className="bussines-page">
        <LeftNav />
        <div className="right-content">
          <Header />
          <BusinessMain />
        </div>
      </div>
    </StatusContext.Provider>
  );
}

export default App;
