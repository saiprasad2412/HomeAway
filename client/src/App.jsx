import Navbar from "./components/Navbar/Navbar"
import "./layout.scss"
import HomePage from "./routes/Homepage/HomePage"
function App() {
  return (
    <div className="layout">
      <Navbar/>
      <div className="content">
        <HomePage/>
      </div>
    </div>
  )
}

export default App