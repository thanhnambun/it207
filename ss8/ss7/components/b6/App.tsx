import React from 'react'
import { ThemeProvider } from './ThemeContext'
import MainScreen from './MainScreen'

export default function App() {
  return (
    <ThemeProvider>
        <MainScreen/>
    </ThemeProvider>
  )
}
