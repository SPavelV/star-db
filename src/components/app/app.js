import React from 'react';

import Header from '../header'
import RandomPlanet from '../random-planet'
import ErrorBoundry from '../error-boundry';

import SwapiService from '../../services/swapi-service'
import DummySwapiService from '../../services/dummy-swapi-service'

import { SwapiServiceProvider } from '../swapi-service-context'

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components'

import './app.css'

export default class App extends React.Component {

  swapiService = new DummySwapiService()

  state = {
    showRandomPlanet: true,
  }

  toggleRandomPlante = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    })
  }

  render() {
    
    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value = {this.swapiService}>
          <div className="stardb-app">
            <Header />

            <PersonDetails itemId={11}/>

            <PlanetDetails itemId={2}/>

            <StarshipDetails itemId={5}/>
          
            <PersonList/>
          
            <StarshipList/>
          
            <PlanetList/>
          
          </div>
        </SwapiServiceProvider>
       
      </ErrorBoundry>
    )
  }
 
}

