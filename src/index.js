import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// const base64url = require("base64url");

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

    const header = { alg: "HS256", typ: "JWT" };
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

    // const unsignedToken = base64url(header) + "." + base64url(payload);

    // console.log(unsignedToken);

    fetch("https://test.easy-task.ru/api/v1/projects/95", {
      headers: {
        Authorization: "Bearer " + res.access_token,
      },
    }).then((res) => res.json().then((r) => console.log(r.data)));
  })
  .catch(function (error) {
    console.log(error);
  });

root.render(<App />);
