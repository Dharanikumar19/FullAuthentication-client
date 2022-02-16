import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Body from "./components/Body/Body";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          
          <Body />
        </div>
      </BrowserRouter>

    </>
  );
}

export default App;
