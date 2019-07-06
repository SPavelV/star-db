import React from 'react';

import Header from '../header'
import RandomPlanet from '../random-planet'
import ErrorButton from '../error-button'
import ErrorIndicator from '../error-indicator'
import PeoplePage from '../people-page/people-page';

import './app.css'

export default class App extends React.Component {

  state = {
    showRandomPlanet: true,
    hasError: false
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
        <PeoplePage/>
        
      </div>
    )
  }
 
}

