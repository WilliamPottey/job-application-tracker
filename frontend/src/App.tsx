import { login } from "./api/auth";
import { useAuth } from "./context/useAuth";



function App() {

  const { user } = useAuth();
  console.log("Auth user:", user)

  async function testLogin() {
    try {
      const res = await login("williampottey@gmail.com", "Wpottey31581066!");
      console.log("Login successful:", res);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <h1>Job Application Tracker</h1>
        <button onClick={testLogin}>Test Login</button>
      </div>
    </>
  )
}

export default App
