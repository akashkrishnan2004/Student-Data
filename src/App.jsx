import React from "react";
import { useState, useEffect } from "react";

import TopBar from "./components/topBar";
import LeftItems from "./components/leftItems";
import RightItems from "./components/rightItems";

import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const storedNames = JSON.parse(localStorage.getItem("names")) || [];
    const storedClasses = JSON.parse(localStorage.getItem("classes")) || [];
    const storedStuIds = JSON.parse(localStorage.getItem("stuIds")) || [];
    const storedMarks = JSON.parse(localStorage.getItem("marks")) || [];

    const loadedStudents = storedNames.map((name, index) => ({
      name,
      class: storedClasses[index],
      stuId: storedStuIds[index],
    }));

    setStudents(loadedStudents);
    setMarks(storedMarks);
  }, []);

  return (
    <div className="app-container">
      <TopBar students={students} marks={marks} />
      <div className="bottomItems">
        <LeftItems />
        <RightItems />
      </div>
    </div>
  );
}

export default App;
