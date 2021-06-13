import React from 'react'
import { NavLink } from "react-router-dom";

function Nav(): JSX.Element {

    return (
        <nav className="inline-block">
            <ul>
                <li className="inline"><NavLink className="bg-white hover:bg-gray-300 text-blue-900 py-2 px-7 font-semibold rounded shadow mr-6" to="/">Top</NavLink></li>
                <li className="inline"><NavLink className="bg-white hover:bg-gray-300 text-blue-900 py-2 px-7 font-semibold rounded shadow" to="/new">New</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav