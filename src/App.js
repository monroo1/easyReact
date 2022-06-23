import "./App.css";
import React, { useState } from "react";
import { StatusContext } from "./context/status";
import Header from "./components/header/Header";
import BusinessMain from "./components/business-main/BusinessMain";
import LeftNav from "./components/left-nav/LeftNav.jsx";
import "./components/left-nav/LeftNav.jsx";

function App() {
  const [apiBp, setApiBb] = useState("https://easytaskbp.tk/");

  const [createBpStatus, setCreateBpStatus] = useState(false);
  const [createBpSampleStatus, setCreateBpSampleStatus] = useState(false);
  const [createTaskStatus, setCreateTaskStatus] = useState(false);

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
    file_id: null,
    deadline: null,
  });

  const [createBpSampleFormDate, setCreateBpSampleFormDate] = useState({
    deadlineDate: null,
    deadlineTime: "00:00",
  });

  const [createBpSampleForm, setCreateBpSampleForm] = useState({
    type: 1,
    options: [],
    businessProcess: {
      name: null,
      deadline: null,
      project_id: null,
      tasks: 1,
      initiator_id: document.cookie.replace(
        /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      ),
    },
  });

  const [createBpSampleFormOptions, setCreateBpSampleFormOptions] = useState(
    {}
  );

  const [createTaskFormDate, setCreateTaskFormDate] = useState({
    beginDate: null,
    beginTime: null,
    endDate: null,
    endTime: null,
  });
  const [createTaskForm, setCreateTaskForm] = useState({
    name: null,
    description: "description",
    begin: null,
    end: null,
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
  const [tasksList, setTasksList] = useState([]);
  const [nowBp, setNowBp] = useState();
  const [depsTask, setDepsTask] = useState();

  const [bearer, setBearer] = useState(
    document.cookie.replace(
      /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    )
  );

  return (
    <StatusContext.Provider
      value={{
        createBpStatus,
        setCreateBpStatus,
        createTaskStatus,
        setCreateTaskStatus,
        createBpSampleStatus,
        setCreateBpSampleStatus,
        createBpForm,
        setCreateBpForm,
        createBpSampleForm,
        setCreateBpSampleForm,
        createBpSampleFormDate,
        setCreateBpSampleFormDate,
        createTaskForm,
        setCreateTaskForm,
        createBpSampleFormOptions,
        setCreateBpSampleFormOptions,
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
        depsTask,
        setDepsTask,
        apiBp,
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
