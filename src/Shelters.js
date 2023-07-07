import React from 'react';
import { useNavigate, Link } from "react-router-dom";

function Shelters( {sheltersList} ) {

    const navigate = useNavigate();

    return (
        <div>
            <div>
                Create a new shelter:
                <button onClick = {() => navigate('/new-shelter-form')}>Click Here</button>
            </div>
            {sheltersList.map((shelter) => 
                <div key = {shelter.id}>
                    <Link to={`/shelters/${shelter.id}`}>
                        <h1>{shelter.name}</h1>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Shelters;