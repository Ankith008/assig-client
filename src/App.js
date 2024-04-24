import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sign from "./component/Sign";
import Home from "./component/Home";
import Graph from "./component/Graph";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Sign />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/graph" element={<Graph />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
