import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Applications from "./pages/Applications";
import { ProtectedRoute } from "./routes/ProtectedRoute";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Navigate to="/applications"/>  
              </ProtectedRoute> 
            } 
          />

          <Route
            path="/login"
            element={
              <Login />
            } 
          />

          <Route
            path="/applications"
            element={ 
              <ProtectedRoute>
                <Applications/>
              </ProtectedRoute>
            }
          />     
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
