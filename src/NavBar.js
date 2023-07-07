import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {

    return(
        <div className = "navbar">
            <NavLink to = "/" exact = "true">Home</NavLink>
            <NavLink to = "/shelters" exact = "true">Shelters</NavLink>
        </div>
    )
}

export default NavBar;