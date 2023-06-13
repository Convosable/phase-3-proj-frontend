import React, { useState, useEffect } from 'react';

function Breeder() {

    const [breedersList, setBreedersList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292/breeders")
        .then((r) => r.json())
        .then((breeder) => {
            console.log(breeder)
            setBreedersList(breeder)
        })
    }, []);


    return(
        <div>
            {breedersList.map((breeder) => 
                <div>
                    <h1>{breeder.name}</h1>
                    <h3>About us: {breeder.bio}</h3>
                    <h3>Located at: {breeder.location}</h3>
                    <h4>Established: {breeder.established_date}</h4>
                </div>
            )}
        </div>
    )
}

export default Breeder;

