import "./App.css";
import React, { useEffect, useState } from "react";
import { StatusContext } from "./context/status";
import Header from "./components/header/Header";
import BusinessMain from "./components/business-main/BusinessMain";
import LeftNav from "./components/left-nav/LeftNav.jsx";
import "./components/left-nav/LeftNav.jsx";

function App() {
  const [bearer, setBearer] = useState(
    document.cookie.replace(
      /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    )
  );
  const [apiBp, setApiBb] = useState("https://easytaskbp.tk/api/v1");
  const [bpList, setBpList] = useState([]);
  const [createBpStatus, setCreateBpStatus] = useState(false);
  const [createBpSampleStatus, setCreateBpSampleStatus] = useState(false);
  const [createTaskStatus, setCreateTaskStatus] = useState(false);

  const [search, setSearch] = useState("");
  const [file, setFile] = useState({});

  const [createBpForm, setCreateBpForm] = useState({
    name: null,
    initiator_id: parseInt(
      document.cookie.replace(
        /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
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
    type: null,
    businessProcess: {
      name: null,
      deadline: null,
      project_id: null,
      tasks: 1,
      initiator_id: parseInt(
        document.cookie.replace(
          /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        )
      ),
    },
    options: [],
  });

  const [createBpSampleFormOptions, setCreateBpSampleFormOptions] = useState(
    {}
  );

  const [createTaskFormDate, setCreateTaskFormDate] = useState({
    currentBeginDate: "",
    beginDate: null,
    beginTime: "",
    currentEndDate: "",
    endDate: null,
    endTime: "",
  });
  const [createTaskForm, setCreateTaskForm] = useState({
    name: "",
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
    status_id: 19, //3
    task_load: 5,
    work_load: 35,
    workflow_id: 1,
  });
  //{"id": 18,"name": "Подзадача","slug": "podzadacha"}-0
  //{id: 19, name: 'Идея', slug: 'idea'}-1
  //{id: 11, name: 'Отменена', slug: 'canceled'}-2

  //{"id": 15,"name": "В архиве","slug": "archived"}-3
  //{id: 3, name: 'Отправлено исполнителю', slug: 'for_approval_performer'}-4
  //{id: 2, name: 'Отправлено автору', slug: 'for_approval_chief'}-5
  //{"id": 14,"name": "Просрочена","slug": "overdue"}-6
  //{id: 10, name: 'В работе', slug: 'in_work'}-7
  //{"id": 13,"name": "Завершено","slug": "completed"}-8

  const [resultDropStatus, setResultDropStatus] = useState("");

  const [start, setStart] = useState(false);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("id");
  const [filterMethod, setFilterMethod] = useState("asc");
  const [openTasks, setOpenTasks] = useState("");
  const [idBp, setIdBp] = useState("");
  const [tasksList, setTasksList] = useState([]);
  const [nowBp, setNowBp] = useState({});
  const [depsTask, setDepsTask] = useState();
  const [tasks, setTasks] = useState([]);

  const [createTaskSampleForm, setCreateTaskSampleForm] = useState({});
  const [createTaskSampleFormStatus, setCreateTaskSampleFormStatus] =
    useState(false);

  const [idSample, setIdSample] = useState("1");
  const [sampleArr, setSampleArr] = useState([]);
  const [statusCreateTask, setStatusCreateTask] = useState(false);
  const [arrTasksSample, setArrTasksSample] = useState([]);
  const [depsTaskSample, setDepsTaskSample] = useState([]);
  const [valueTaskSample, setValueTaskSample] = useState([]);
  const [nowTask, setNowTask] = useState("");
  const [endTasksSample, setEndTasksSample] = useState([]);
  const [tasksArr, setTasksArr] = useState([]);
  const [taskSample, setTaskSample] = useState({
    name: "",
    executor_id: "",
  });
  const [lengthArrTasks, setLengthArrTasks] = useState("");
  const [addTaskSample, setAddTaskSample] = useState(false);
  const [addTasksMenu, setAddTasksMenu] = useState(false);
  const [thisBp, setThisBp] = useState({});

  const [projects, setProjects] = useState([]);
  //menu
  const [openMenuTasks, setOpenMenuTasks] = useState(false);
  const [openMenuBp, setOpenMenuBp] = useState(false);
  const [idCall, setIdCall] = useState("");
  const [idCallBp, setIdCallBp] = useState("");

  const [contract, setContract] = useState();
  const [contractLast, setContractLast] = useState();
  const [contractTaskOptions, setContractTaskOptions] = useState();
  const [contractTaskOptionsNow, setContractTaskOptionsNow] = useState({});
  const [contractBp, setContractBp] = useState();
  const [task, setTask] = useState({});
  const [bp, setBp] = useState({});
  const [bpResultStatus, setBpResultStatus] = useState(false);
  return (
    <StatusContext.Provider
      value={{
        users,
        start,
        setStart,
        thisBp,
        setThisBp,
        setUsers,
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
        createTaskSampleForm,
        setCreateTaskSampleForm,
        createTaskSampleFormStatus,
        setCreateTaskSampleFormStatus,
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
        tasks,
        setTasks,
        idSample,
        setIdSample,
        sampleArr,
        setSampleArr,
        arrTasksSample,
        setArrTasksSample,
        depsTaskSample,
        setDepsTaskSample,
        valueTaskSample,
        setValueTaskSample,
        nowTask,
        setNowTask,
        endTasksSample,
        setEndTasksSample,
        statusCreateTask,
        setStatusCreateTask,
        tasksArr,
        setTasksArr,
        taskSample,
        setTaskSample,
        lengthArrTasks,
        setLengthArrTasks,
        addTaskSample,
        setAddTaskSample,
        bpList,
        setBpList,
        projects,
        setProjects,
        addTasksMenu,
        setAddTasksMenu,
        openMenuTasks,
        setOpenMenuTasks,
        openMenuBp,
        setOpenMenuBp,
        idCall,
        setIdCall,
        search,
        setSearch,
        resultDropStatus,
        setResultDropStatus,
        contract,
        setContract,
        contractLast,
        setContractLast,
        contractTaskOptions,
        setContractTaskOptions,
        file,
        setFile,
        contractTaskOptionsNow,
        setContractTaskOptionsNow,
        contractBp,
        setContractBp,
        task,
        setTask,
        idCallBp,
        setIdCallBp,
        bp,
        setBp,
        bpResultStatus,
        setBpResultStatus,
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
