import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ItemsList from './pages/ItemsList';
import ReportItem from './pages/ReportItem';
import MyItems from './pages/MyItems';
import ItemDetail from './pages/ItemDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/my-items" element={<MyItems />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportItem />} />
            <Route path="/items" element={<ItemsList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;