import{ createContext} from 'react';

// Create a Context
export const ThemeContext = createContext();


// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }) => {
    // const [theme, setTheme] = useState('light');
  
    // const toggleTheme = () => {
    //   setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    // };
    const user = { name: "Muhammad Shamin Farhan", age: 25 };
  
    return (
      <ThemeContext.Provider value={user}>
        {children}
      </ThemeContext.Provider>
    );
  };

  
  export default ThemeProvider