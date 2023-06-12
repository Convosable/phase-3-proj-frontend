import React, {useState, useEffect} from 'react';

function Dog() {

    const [dogsList, setDogsList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292/dogs")
        .then (r => r.json())
        .then((dogs) => setDogsList(dogs)); 
    }, []);

    return (
    <div className="dogs">
      {dogsList.map((dog) => 
        <div key={dog.id}>
          <h1>{dog.name}</h1>
          <img src = {dog.image_url} alt = {dog.name} height="300"/>
          <h4>Age: {dog.age} Sex: {dog.sex}  Weight: {dog.weight} lbs.</h4>
          <Link/ >
        </div>
      )}
    </div>
  );
}

export default Dog;
