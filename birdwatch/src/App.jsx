import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ItemDetails from "./pages/ItemDetails";
import Favourites from "./pages/Favourites";
import Header from "./components/Header";
import About from "./pages/About";
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/item/:speciesCode" element={<ItemDetails />} />
        <Route path="/sightings" element={<Favourites />} />
        <Route path="/about" element={<About />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </>
  );
}

export default App;

console.log(import.meta.env);
