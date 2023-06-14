import React, { useState, useEffect } from 'react';

function Breeder() {

    const [breedersList, setBreedersList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292/breeders")
        .then((r) => r.json())
        .then((breeder) => setBreedersList(breeder))
    }, []);


    return(
        <div>
            {breedersList.map((breeder) => 
                <div key = {breeder.id}>
                    <h1>{breeder.name}</h1>
                    <h3>About us: {breeder.bio}</h3>
                    <h3>Located at: {breeder.location}</h3>
                    <h4>Established: {breeder.established_date}</h4>
                    <button>Click to see all dogs and cats.</button>
                </div>
            )}
        </div>
    )
}

export default Breeder;

