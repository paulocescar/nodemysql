import React from "react";
import Routes from "./routes";
import "./styles/global";
import { Button } from 'reactstrap';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

const App = () => <Routes />;
export default App;
