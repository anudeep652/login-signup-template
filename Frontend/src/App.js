import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth/Auth";
import Sample from "./Sample";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Routes>

          <Route path="/user/dashboard" element={<Sample />} />

          <Route path="/" element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
