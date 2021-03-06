import "office-ui-fabric-react/dist/css/fabric.min.css";
import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import Config from "./Configs/Config";
/* global AppContainer, Component, document, Office, module, require */

initializeIcons();

let isOfficeInitialized = false;

const title = "Coloriƨation";

const render = (Component) => {
  // window.localStorage.clear();
  const c = Config.LoadCurrentConfigObj();
  ReactDOM.render(
    <AppContainer>
      <Component title={title} isOfficeInitialized={isOfficeInitialized} storedConf={c}/>
    </AppContainer>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.initialize = () => {
  isOfficeInitialized = true;
  render(App);
};

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
