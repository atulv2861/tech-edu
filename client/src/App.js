
import Home from "./pages/Home.jsx"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return <>
   <Router>      
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/allcourses" element={} />
        <Route path="/enrolledcourses" element={} /> */}
      </Routes>
    </Router>   
  </>
}

export default App;
