import React from 'react'
import { ThemeContext } from '../contexts/ThemeContext';

function StyleMode({toggleTheme}: {toggleTheme: ()=>void}): JSX.Element {
    const theme = React.useContext(ThemeContext);
    
    return <button className="theme-select inline-block float-right text-2xl"  onClick={toggleTheme}>
        { theme === 'light' ? '🔦' : '💡'}</button>;
}

export default StyleMode