import { Table } from "./app/features/table/Table";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { ProductDetail } from "./app/features/detail/ProductDetail";
function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
