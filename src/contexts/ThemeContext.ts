import React from 'react'

export type Theme = 'light' | 'dark'

export const ThemeContext = React.createContext<Theme>('light')
