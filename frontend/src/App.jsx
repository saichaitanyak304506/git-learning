import { useState } from "react";
import "./App.css";
import Debounce from "./components/debounce";
import InfiniteScrolling from "./components/InfiniteScrolling";

function App() {

  return (
    <div>
      {/* <Debounce /> */}
      <InfiniteScrolling />
    </div>
  );
}

export default App;
