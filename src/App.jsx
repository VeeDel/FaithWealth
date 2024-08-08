import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import ProtectedRoute from "../src/Context/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="max-w-[480px] mx-auto font-josef">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute redirectTo="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
