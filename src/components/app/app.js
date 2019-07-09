import React from 'react';

import Header from '../header'
import RandomPlanet from '../random-planet'
import ErrorButton from '../error-button'
import ErrorIndicator from '../error-indicator'
import PeoplePage from '../people-page';
import ItemList from '../item-list'
import ItemDetails from '../item-details'
import Row from '../row'

import SwapiService from '../../services/swapi-service'

import './app.css'
import ErrorBoundry from '../error-boundry';

export default class App extends React.Component {

  swapiService = new SwapiService()

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

    const personDetails = (
      <ItemDetails itemId={11}/>
    )

    const starShiptDetails = (
      <ItemDetails itemId={5}/>
    )

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          <Row
            left={personDetails}
            right={starShiptDetails}
          />
          
        </div>
      </ErrorBoundry>
    )
  }
 
}

