import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
// import CardList from './TwitterCard';
// import TimersDashboard from './Timer';
import App from "./daily-react-components/Login";

ReactDOM.render(<App />, document.getElementById("content"));
registerServiceWorker();
