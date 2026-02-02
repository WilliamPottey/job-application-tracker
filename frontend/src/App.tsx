import { login } from "./api/auth";
import { useAuth } from "./context/useAuth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Applications from "./pages/Applications";



function App() {

  const auth = useAuth();
  console.log("Auth user:", auth.user)

  async function onClickLogin() {
    try {
      const res = await login("williampottey@gmail.com", "Wpottey31581066!");
      auth.login(res.token, res.user);
      console.log("Login successful:", res);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login"/> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/applications" element={ <Applications/> } />
        
      </Routes>
    </BrowserRouter>
      {/* <div style={{ padding: "2rem" }}>
        <h1>Job Application Tracker</h1>
        <button onClick={onClickLogin}>Test Login</button>
      </div> */}
    </>
  )
}

export default App
