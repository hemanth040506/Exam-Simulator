import { useState } from "react";
import Home from "./pages/Home";
import Exam from "./pages/Exam";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      {page === "home" && <Home onStart={() => setPage("exam")} />}
      {page === "exam" && <Exam />}
    </>
  );
}

export default App;
