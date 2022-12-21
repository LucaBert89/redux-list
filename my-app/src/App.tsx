import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { Table } from "./features/table/Table";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Table></Table>
    </div>
  );
}

export default App;
