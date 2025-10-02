import { createContext, ReactNode, useState } from "react";

type ThemeContextType = {
    theme: string;
    setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = { children: ReactNode};

export const ThemeProvider = ({children}: Props) => {
    const [theme, setTheme] = useState("light");

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}