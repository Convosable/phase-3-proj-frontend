import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Dog from './Dog';
import Cat from './Cat';
import Shelter from './Shelter';
import Homepage from './Homepage';
import NewDogForm from './NewDogForm';
import DogDetails from './DogDetails';
import ShelterDetails from './ShelterDetails';
import NewCatForm from './NewCatForm';
import CatDetails from './CatDetails';
import { Route, Routes } from "react-router-dom"

function App() {

  const [dogsList, setDogsList] = useState([]);
  const [catsList, setCatsList] = useState([]);
  const [sheltersList, setSheltersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9292/dogs")
      .then(r => r.json())
      .then((dogs) => setDogsList(dogs));
  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/cats")
      .then(r => r.json())
      .then((cats) => setCatsList(cats));
  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/shelters")
      .then((r) => r.json())
      .then(shelters => {
        setSheltersList(shelters)
        setIsLoading(false)
      })
  }, []);


  if (isLoading) return <h1>Loading...</h1>

  function handleNewDogSubmit(newDog) {
    setDogsList([...dogsList, newDog])
  }

  function handleDogDelete(dog) {
    const updatedDogs = dogsList.filter( d => d.id !== dog.id)
    setDogsList(updatedDogs)
  }

  function handleDogUpdate(dog) {
    const updatedDog = dogsList.map( d => {
      if (d.id === dog.id) {
        return dog
      } 
      return d
    })
    setDogsList(updatedDog)
  }

  function handleNewCatSubmit(newCat) {
    setCatsList([...catsList, newCat])
  }

  function handleCatDelete(cat) {
    const updatedCats = catsList.filter( c => c.id !== cat.id)
    setCatsList(updatedCats)
  }

  function handleCatUpdate(cat) {
    const updatedCat = catsList.map( c => {
      if (c.id === cat.id) {
        return cat
      }
      return c
    })
    setCatsList(updatedCat)
  }


  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/dogs" element={<Dog dogsList={dogsList} />} />
        <Route exact path="/dogs/:id" element={<DogDetails handleDogUpdate = {handleDogUpdate} handleDogDelete = {handleDogDelete}/>} />
        <Route exact path="/new-dog-form" element={<NewDogForm handleNewDogSubmit = {handleNewDogSubmit}/>} />
        <Route exact path="/cats" element={<Cat catsList={catsList} />} />
        <Route exact path="/new-cat-form" element={<NewCatForm handleNewCatSubmit = {handleNewCatSubmit}/>}></Route>
        <Route exact path="/cats/:id" element={<CatDetails handleCatUpdate = {handleCatUpdate} handleCatDelete = {handleCatDelete}/>} />
        <Route exact path="/shelters" element={<Shelter sheltersList={sheltersList} />} />
        <Route exact path="/shelters/:id" element={<ShelterDetails sheltersList={sheltersList} />} />
      </Routes>
    </div>
  );
}

export default App;