import { ThemeContext } from "./context";
import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import { Switch, Route } from "react-router";
function App() {
  const [activeTheme, setActiveTheme] = useState("dark");
  const changeTheme = () => {
    if (activeTheme === "dark") setActiveTheme("light");
    else setActiveTheme("dark");
  };
  const themeValue = {
    dark: {
      background: "#191e2c",
      text: "#efefef",
      name: "dark",
      card: "#2b2f3e",
      icon: "#d3d3d3",
      changeTheme,
    },
    light: {
      background: "#eee",
      text: "#000",
      name: "light",
      card: "",
      icon: "",
      changeTheme,
    },
  };
  return (
    <ThemeContext.Provider value={themeValue[activeTheme]}>
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route path="/homepage">
          <HomeScreen />
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
      </Switch>
    </ThemeContext.Provider>
  );
}

export default App;
