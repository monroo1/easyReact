import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

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
