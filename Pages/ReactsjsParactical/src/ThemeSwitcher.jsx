import  {useContext} from "react";
import { ThemeContext } from "./ThemeProvider";

const ThemeSwitcher = () => {
    // const { theme, toggleTheme } = useContext(ThemeContext);
    const user = useContext(ThemeContext);
  console.log(ThemeContext,"kk");
  
    return (
      <div >
        <h1>Profile</h1>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
      </div>
    );
  };

  export default ThemeSwitcher