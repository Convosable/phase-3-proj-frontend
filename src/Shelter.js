import React, { useState, useEffect } from 'react';

function Shelter( {sheltersList} ) {

    return (
        <div>
            {sheltersList.map((shelter) => 
                <div key = {shelter.id}>
                    <h1>{shelter.name}</h1>
                    <h3>About us: {shelter.bio}</h3>
                    <h3>Located at: {shelter.location}</h3>
                    <h4>Established: {shelter.established_date}</h4>
                    <button>Click to see all dogs and cats.</button>
                </div>
            )}
        </div>
    )
}

export default Shelter;