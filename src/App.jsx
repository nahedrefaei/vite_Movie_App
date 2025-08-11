import { Route, Routes, BrowserRouter} from "react-router";
import Home from "./components/Home";
import Details from "./components/Details";
import FavoritesList from "./components/FavoritesList";

function App() {


 
  return (
    
 
    <div className="bg-slate-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="/favorites/:id" element={<FavoritesList />} />
      </Routes>
    </div>

  )
}

export default App
