import { useState } from "react";
import "./App.css";
import Debounce from "./components/debounce";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Debounce />
    </>
  );
}

export default App;
