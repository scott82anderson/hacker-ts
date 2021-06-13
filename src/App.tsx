import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Comments from './components/Comments';
import Nav from './components/Nav';
import Posts from './components/Posts';
import StyleMode from './components/StyleMode';
import User from './components/User';
import { Theme, ThemeContext } from './contexts/ThemeContext';


function App() {
  const [theme, setTheme] = React.useState<Theme>("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"))

  useEffect(() => {
    document.getElementsByTagName( 'html' )[0].classList.value = ''
    document.getElementsByTagName( 'html' )[0].classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`md:container md:mx-auto py-4 ${theme}`}>
        <Router>
          <header className="bg-yellow-300 dark:bg-blue-900 rounded shadow p-5">
            <h1 className="inline mr-6 text-3xl font-bold align-middle dark:text-white">HN</h1>
            <Nav />
            <StyleMode toggleTheme={toggleTheme} />
          </header>
          <div className="main">
          <Switch>
            <Route path="/user" component={User} />
            <Route path="/post" component={Comments} />
            <Route path="/new">
              <Posts type={"new"} />
            </Route>
            <Route path="/">
              <Posts type={"top"} />
            </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
