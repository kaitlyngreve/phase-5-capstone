import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Recipe from './Recipe';
import Header from './Header'
import Login from './Login'
import Signup from './Signup';
import UserRecipe from './UserRecipe';
import UserRecipeDetail from './UserRecipeDetail'

function App() {
  const [recipes, setRecipes] = useState([]);
  const [cuisines, setCuisines] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [searchRecipes, setSearchRecipes] = useState("")

  useEffect(() => {
    fetch("/recipes")
      .then((r) => r.json())
      .then((data) => setRecipes(data));
  }, []);


  useEffect(() => {
    fetch("/cuisines")
      .then((r) => r.json())
      .then((data) => setCuisines(data));
  }, []);

  useEffect(() => {
    fetch('/me')
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((user) => {
              setIsAuthenticated(true);
              setUser(user);
            });
        }
      });
    fetch('/recipes')
      .then(res => res.json())
      .then(setRecipes);
  }, []);

  const handleNewUserRecipe = (data) => {
    setRecipes([...recipes, data])
  }

  const handleDeleteUserRecipe = (resp) => {
    console.log(resp)
    let filteredResp = recipes.filter(userRecipe => userRecipe.id !== resp.id)
    setRecipes(filteredResp)
  }

  const handleUpdateUser = (user) => {
    setUser(user)
  }

  const handleSearchRecipes = (e) => {
    setSearchRecipes(e.target.value)
  }

  const recipesToDisplay = recipes.filter((recipe) => {
    return recipe.title.toLowerCase().includes(searchRecipes.toLowerCase())
  })

  if (!isAuthenticated) return <Login error={'please log in'} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/signup">
            <Signup handleUpdateUser={handleUpdateUser} setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <Route path="/myrecipes">
            <Header user={user} setUser={setUser} />
            <UserRecipe
              handleDeleteUserRecipe={handleDeleteUserRecipe}
              recipes={recipes}
              user={user}
              handleNewUserRecipe={handleNewUserRecipe}
              cuisines={cuisines} />
          </Route>
          <Route path="/homepage">
            <Header user={user} setUser={setUser} recipes={recipes} />
            <Recipe
              recipes={recipesToDisplay}
              user={user} cuisines={cuisines}
              handleSearchRecipes={handleSearchRecipes}
              setRecipes={searchRecipes} />
          </Route>
          <Route path="/recipes/:id">
            <Header user={user} setUser={setUser} />
            <UserRecipeDetail recipes={recipes} user={user} />
          </Route>
          <Route path="/login">
            <Login handleUpdateUser={handleUpdateUser} user={user} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
