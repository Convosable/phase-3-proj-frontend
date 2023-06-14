import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from "react-router-dom";

function Dog() {

    const [dogsList, setDogsList] = useState([]);
    const [textInput, setTextInput] = useState({id: ''});

    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9292/dogs")
        .then (r => r.json())
        .then((dogs) => setDogsList(dogs)); 
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/dogs/${textInput.id}`)
    }

    function handleChange(e) {
        setTextInput({
            ...textInput,
            [e.target.name] : e.target.value
        })
    }
    
    return (
    <div className="dogs">
        <div>
            List a dog for Adoption:
            <button onClick = {() => navigate('/new-dog-form')}>Click Here</button>
        </div>
        <div>
            Search for dog by ID:
            <form onSubmit = {handleSubmit}>
                <input onChange = {handleChange} type="text" placeholder="Dog ID" name="id" value={textInput.id}/>
                <input type="submit" value = "Search"/>
            </form>
        </div>
      {dogsList.map((dog) => 
        <div key={dog.id}>
          <h1>{dog.name}</h1>
          <img src = {dog.image_url} alt = {dog.name} height="300"/>
          <h2>Breed: {dog.breed}</h2>
          <h4>Age: {dog.age} Sex: {dog.sex}</h4>
          <Link to={`/dogs/${dog.id}`}>More Details</Link>
        </div>
      )}
    </div>
  );
}

export default Dog;

//add search for dog by id
//search by breed etc.