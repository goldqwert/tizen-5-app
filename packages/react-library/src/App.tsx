import React from "react";
import { defineCustomElements, MyComponent } from "react-library";

defineCustomElements();

const App: React.FC = () => (
  <div>
    <h1>React + Stencil</h1>
    <MyComponent first="App" />
  </div>
);

export default App;
