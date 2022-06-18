import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));

fetch("https://test.easy-task.ru/api/v1/login", {
  method: "POST",
  body: JSON.stringify({
    email: "dfedin@mastercr.ru",
    password: "VaryaginaStyle2022",
  }),
})
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    document.cookie = `access_token=${res.access_token}`;
    document.cookie = `user_id=${res.user_id}`;

    const payload = {
      secret_key:
        "kN6Gd9LpZBhpMbZNzVlAOsXLkIB7cZS36McLID2W7LJOU2GiweRxpuchNoiEg8ND8PI5Pf_easyTask",
      isAuth: document.cookie.replace(
        /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
        ? true
        : false,
      userId: document.cookie.replace(
        /(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      ),
    };

    axios
      .post(
        `https://87a63cc6b4327d.lhrtunnel.link/api/v1/login_and_get_key?isAuth=${payload.isAuth}&secret_key=${payload.secret_key}&userId=${payload.userId}`
      )
      .then((response) => {
        return (document.cookie = `access_token_jwt=${response.data}`);
      });

    // fetch("https://test.easy-task.ru/api/v1/tasks", {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer " + res.access_token,
    //   },
    //   body: JSON.stringify({
    //     begin: "13-01-2021 12:54:05",
    //     cyclic_task_id: 62,
    //     description: "цикл 2",
    //     end: "15-01-2022 13:54:05",
    //     executor_id: 74,
    //     name: "цикл 1",
    //     next_id: null,
    //     parent_id: null,
    //     prev_id: null,
    //     priority_id: 2,
    //     project_id: 102,
    //     project_section_id: 255,
    //     provide_to: 0,
    //     status_id: 2,
    //     task_load: 5,
    //     work_load: 35,
    //     workflow_id: 1,
    //   }),
    // }).then((res) => console.log(res.json()));
  })
  .catch(function (error) {
    console.log(error);
  });

root.render(<App />);
