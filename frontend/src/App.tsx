import { login } from "./api/auth";



function App() {

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
