import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {

    return(
        <div className = "navbar">
            <NavLink exact to = "/">Home</NavLink>
            <NavLink exact to = "/dogs">Dogs</NavLink>
            <NavLink exact to = "/cats">Cats</NavLink>
            <NavLink exact to = "/shelters">Shelters</NavLink>
            <NavLink exact to = "/breeders">Breeders</NavLink>
        </div>
    )
}

export default NavBar;