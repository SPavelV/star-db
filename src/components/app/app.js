import React from 'react';

import Header from '../header'
import RandomPlanet from '../random-planet'
import ItemDetails,{Record} from '../item-details/item-details'
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

    const {getPerson, getStarship,getPersonImage,getStarshipImage} = this.swapiService;

    const personDetails = (
      <ItemDetails 
        getData={getPerson} 
        itemId={11}
        getImageUrl={getPersonImage}>
          
          <Record field="gender" label="Gender"/>
          <Record field="eyeColor" label="Eye Color"/>

      </ItemDetails>
    )

    const starShiptDetails = (
      <ItemDetails 
        getData={getStarship} 
        itemId={5}
        getImageUrl={getStarshipImage}/>
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

