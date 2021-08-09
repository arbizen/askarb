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
      textSecondary: "#d3d3d3",
      name: "dark",
      card: "#2b2f3e",
      icon: "#d3d3d3",
      bodyText: "rgb(149, 157, 165)",
      tabActive: "#fff",
      tabInactive: "#808080",
      header: "#fff",
      headerNext: "#000",
      changeTheme,
    },
    light: {
      background: "#eee",
      text: "#000",
      textSecondary: "#000",
      name: "light",
      card: "#fff",
      icon: "#000",
      bodyText: "grey",
      tabActive: "#000",
      tabInactive: "#808080",
      header: "#000",
      headerNext: "#fff",
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
