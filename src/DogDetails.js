import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

function DogDetails() {

    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:9292/dogs/${params.id}`)
        .then(r => r.json())
        .then((dog) => console.log(dog))
    },[])

    

    return(
        <div>
            'dog details'
        </div>
    )
}

export default DogDetails;