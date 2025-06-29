import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import { useApolloClient } from "@apollo/client";
import { ME } from "./queries";
import { useQuery } from "@apollo/client";
import Recommendation from "./components/Recommendation";
import { useEffect } from "react";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [recommendation, setRecommendation] =useState('')

  const client = useApolloClient()

  const result = useQuery(ME)
  useEffect(() => {
    if (result.data) {
      setRecommendation(result.data.me.favoriteGenre)
    }
  },[result.data])
  

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />

        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("login")}>login</button>

        <LoginForm
          show={page === "login"}
          setToken={setToken} 
          setError={notify}
          setPage={setPage}
        />
        
        <Authors show={page === "authors"} />

        <Books show={page === "books"} />

      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommended")}>recommended</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendation show={page === "recommended"} recommendation={recommendation} />
    </div>
  );
};

export default App;
