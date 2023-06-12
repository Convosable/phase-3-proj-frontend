import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {

    return(
        <div className = "navbar">
            <NavLink to = "/" exact = "true">Home</NavLink>
            <NavLink to = "/dogs" exact = "true">Dogs</NavLink>
            <NavLink to = "/cats" exact = "true">Cats</NavLink>
            <NavLink to = "/shelters" exact = "true">Shelters</NavLink>
            <NavLink to = "/breeders" exact = "true">Breeders</NavLink>
        </div>
    )
}

export default NavBar;