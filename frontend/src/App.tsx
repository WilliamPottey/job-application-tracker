import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Applications from "./pages/Applications";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import NewApplication from "./pages/NewApplication";
import EditApplication from "./pages/EditApplication";


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

          <Route
            path="/applications/new"
            element={
              <ProtectedRoute>
                <NewApplication/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/:id/edit"
            element={
              <ProtectedRoute>
                <EditApplication/>
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
