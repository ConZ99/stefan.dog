import "../src/styles/style.css";
import "./App.css"
import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
