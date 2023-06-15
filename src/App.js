import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Dog from './Dog';
import Cat from './Cat';
import Shelter from './Shelter';
import Breeder from './Breeder';
import Homepage from './Homepage';
import NewDogForm from './NewDogForm';
import DogDetails from './DogDetails';
import ShelterDetails from './ShelterDetails';
import { Route, Routes } from "react-router-dom"

function App() {


  useEffect(() => {
    fetch("http://localhost:9292/test")
      .then((r) => r.json())
      .then((data) => console.log(data))
      }, [])

  return (
    <div className="App">
      <NavBar />
        <Routes>
          <Route exact path = "/" element = {<Homepage />} />
          <Route exact path = "/dogs" element = {<Dog />} />
          <Route exact path = "/cats" element = {<Cat />} />
          <Route exact path = "/shelters" element = {<Shelter />} />
          <Route exact path = "/breeders" element = {<Breeder />} />
          <Route exact path = "/new-dog-form" element = {<NewDogForm />} />
          <Route exact path = "/dogs/:id" element = {<DogDetails />} />
          <Route exact path = "/shelters/:id" element = {<ShelterDetails />} />
        </Routes>
    </div>
  );
}

export default App;
