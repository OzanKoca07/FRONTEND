import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {UsersProvider} from "./store/UsersContext";
import {PostsProvider} from "./store/PostsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UsersProvider>
      <PostsProvider>
        <BrowserRouter>
        <App/>
          </BrowserRouter>
      </PostsProvider>
    </UsersProvider>
  </React.StrictMode>
);
