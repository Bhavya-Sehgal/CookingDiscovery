import TopBar from "./Components/TopBar/TopBar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Settings from "./Pages/Settings/Settings";
import Single from "./Pages/Single/Single";
import Write from "./Pages/Write/Write";
import UpdatePost from "./Pages/UpdatePost/UpdatePost";
import Register from "./Pages/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNavbar from "./Components/TopBar/SideNavbar";
import Footer from "./Components/Footer/Footer";
import AllPosts from "./Pages/AllPosts/AllPosts";
import { useContext } from "react";
import { Context } from "./Context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <div className="App">
        <TopBar />
        <SideNavbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/write" element={user ? <Write /> : <Register />} />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Register />}
          />
          <Route
            path="/updatepost/:postId"
            element={user ? <UpdatePost /> : <Register />}
          />
          <Route path="/post/:postId" element={<Single />} />
          <Route path="/allposts" element={<AllPosts />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
