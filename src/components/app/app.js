import React from 'react';

import Header from '../header'
import RandomPlanet from '../random-planet'
import ErrorButton from '../error-button'
import ErrorIndicator from '../error-indicator'
import PeoplePage from '../people-page/people-page';
import ItemList from '../item-list'
import PersonDetails from '../person-details'
import SwapiService from '../../services/swapi-service'

import './app.css'

export default class App extends React.Component {

  swapiService = new SwapiService()

  state = {
    showRandomPlanet: true,
    hasError: false,
    
  }

  toggleRandomPlante = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    })
  }

  componentDidCatch() {
    console.log('---componentDidCatch:',)
    this.setState({ hasError: true })
  }

  render() {
    if(this.state.hasError) {
      return <ErrorIndicator/>
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    return (
      <div className="stardb-app">
        <Header />
        { planet }
        
        <div className="row mb2">
          <div className="col">
          <button
            className="toggle-planet btn btn-warning bth-lg"
            onClick={this.toggleRandomPlante}>
              Toggle Random Planet
          </button>
          <ErrorButton/>
        </div>
        </div>
        
        <PeoplePage/>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
              onItemSelected={this.onPersonSelected}
              getData = {this.swapiService.getAllPlanets}
              renderItem = {(item) => <span>{item.name} <button>!</button></span>}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>
        

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
              onItemSelected={this.onPersonSelected}
              getData = {this.swapiService.getAllStarships}
              renderItem = {(item) => item.name}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>
        
      </div>
    )
  }
 
}

