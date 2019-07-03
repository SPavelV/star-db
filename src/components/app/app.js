import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';

export default class App extends React.Component {

  state = {
    showRandomPlanet: true
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
      <div>
        <Header />
        { planet }

        <button
          className="toggle-planet btn btn-warning bth-lg"
          onClick={this.toggleRandomPlante}>
            Toggle Random Planet
        </button>
  
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList />
          </div>
          <div className="col-md-6">
            <PersonDetails />
          </div>
        </div>
      </div>
    )
  }
 
}

