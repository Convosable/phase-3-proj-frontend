import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Shelters from './Shelters';
import Homepage from './Homepage';
import DogDetails from './DogDetails';
import ShelterDetails from './ShelterDetails';
import NewCatForm from './NewCatForm';
import CatDetails from './CatDetails';
import NewShelterForm from './NewShelterForm';
import { Route, Routes } from "react-router-dom"

function App() {

  const [sheltersList, setSheltersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9292/shelters")
      .then((r) => r.json())
      .then(shelters => {
        setSheltersList(shelters)
        setIsLoading(false)
      })
  }, []);


  if (isLoading) return <h1>Loading...</h1>

  // function handleDogDelete(dog) {
  //   const updatedDogs = dogsList.filter( d => d.id !== dog.id)
  //   setDogsList(updatedDogs)
  // }

  // function handleDogUpdate(dog) {
  //   const updatedDog = dogsList.map( d => {
  //     if (d.id === dog.id) {
  //       return dog
  //     } 
  //     return d
  //   })
  //   setDogsList(updatedDog)
  // }

  // function handleNewCatSubmit(newCat) {
  //   setCatsList([...catsList, newCat])
  // }

  // function handleCatDelete(cat) {
  //   const updatedCats = catsList.filter( c => c.id !== cat.id)
  //   setCatsList(updatedCats)
  // }

  // function handleCatUpdate(cat) {
  //   const updatedCat = catsList.map( c => {
  //     if (c.id === cat.id) {
  //       return cat
  //     }
  //     return c
  //   })
  //   setCatsList(updatedCat)
  // }

  function handleNewShelterSubmit(newShelter) {
    setSheltersList([...sheltersList, newShelter])
  }

  function handleShelterDelete(shelter) {
    const updatedShelters = sheltersList.filter( s => s.id !== shelter.id)
    setSheltersList(updatedShelters)
  }

  console.log(sheltersList)
  function handleCatDelete(cat) {
    const updatedShelters = sheltersList.map(shelter => {
      if (shelter.id === cat.shelter_id) {
        const updatedCats = shelter.cats.filter(c => c.id !== cat.id);
        return {...shelter, cats: updatedCats}
      }
      return shelter
    })
    setSheltersList(updatedShelters)
}

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/dogs/:id" element={<DogDetails />} />
        <Route exact path="/cats/:id" element={<CatDetails handleCatDelete = {handleCatDelete}/>} />
        <Route exact path="/shelters" element={<Shelters sheltersList={sheltersList} />} />
        <Route exact path="/shelters/:id" element={<ShelterDetails sheltersList={sheltersList} handleShelterDelete = {handleShelterDelete}/>} />
        <Route exact path="/new-shelter-form" element={<NewShelterForm handleNewShelterSubmit = {handleNewShelterSubmit}/>} />
      </Routes>
    </div>
  );
}

export default App;