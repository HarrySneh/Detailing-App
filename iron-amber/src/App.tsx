import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Terms from "./pages/Terms";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </HashRouter>
  );
}