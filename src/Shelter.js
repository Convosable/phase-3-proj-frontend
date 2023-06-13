import React, { useState, useEffect } from 'react';

function Shelter() {

    const [sheltersList, setSheltersList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292/shelters")
        .then((r) => r.json())
        .then(shelters => setSheltersList(shelters))
    }, []);

    return (
        <div>
            {sheltersList.map((shelter) => 
                <div>
                    <h1>{shelter.name}</h1>
                    <h3>About us: {shelter.bio}</h3>
                    <h3>Located at: {shelter.location}</h3>
                    <h4>Established: {shelter.established_date}</h4>
                </div>
            )}
        </div>
    )
}

export default Shelter;