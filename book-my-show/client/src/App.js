import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import Admin from "./pages/Admin";
import Profile from "./pages/User";
import Partner from "./pages/Partner";
import SingleMovie from "./pages/Home/SingleMovie";
import BookShow from "./pages/Home/BookShow";
import Forget from "./pages/User/ForgetPassword";
import Reset from "./pages/User/ResetPassword";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/partner"
              element={
                <ProtectedRoute>
                  <Partner />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/movie/:id"
              element={
                <ProtectedRoute>
                  <SingleMovie />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/book-show/:id"
              element={
                <ProtectedRoute>
                  <BookShow />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/forget" element={<Forget />} />
            <Route path="/reset/:email" element={<Reset />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
