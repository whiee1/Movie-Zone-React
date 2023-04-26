import "./App.css";
import Home from "./screens/Home";
import MovieDetails from "./screens/MovieDetails";
import SignUpForm from "./components/SignUpForm";
import LogInForm from "./components/LogInForm";

function App() {
  return (
    <>
      <div className="App"> Malin Movie Sida</div>
      <SignUpForm />
      <LogInForm />
      <MovieDetails />
      <Home />
    </>
  );
}

export default App;
