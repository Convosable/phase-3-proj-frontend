import React, { useState, useEffect} from 'react';

function Cat() {

    const [catsList, setCatsList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292/cats")
        .then (r => r.json())
        .then((cats) => setCatsList(cats)); 
    }, []);

    return (
    <div className="cats">
      {catsList.map((cat) => 
        <div key={cat.id}>
          <h1>{cat.name}</h1>
          <img src = {cat.image_url} alt = {cat.name} height="300"/>
          <h4>Age: {cat.age} Sex: {cat.sex}  Weight: {cat.weight} lbs.</h4>
        </div>
      )}
    </div>
  );
}

export default Cat;
