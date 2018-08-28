import React, { Component } from 'react';
import './App.css';

import * as locationdata from './LocationData.json'
import Locations from './Locations'

class App extends Component {
  state = {
    locations: [],
    sidebarShow: true
  }

  // Prepare the locations array
  componentDidMount() {
    this.addWikiContents();
  }

  addWikiContents = () => {

    let locations = [];
    
    // Load the initial array from the JSON File
    locations.push(...locationdata)

    // Fetch addition information from Wikipedia
    locations.map((location) => {
      let infoData = [];
      let wikisource = [];
      
      let query = location.title;
      
      fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&exchars=350&explaintext&titles=${query.replace(/ /g, '_')}&exintro=1`)
          .then(res => {
            return res.json()})
          .then(data => {
            
            let content = data.query.pages[Object.keys(data.query.pages)[0]].extract;
            let source = data.query.pages[Object.keys(data.query.pages)[0]].pageid;

            // Add the info gathered from wikipedia
            infoData.push(content);       
            wikisource.push("https://en.wikipedia.org/?curid=" + source);
            
          })
          .catch(error => {

            // Push specific message to <DetailsPage/> of each location item
            let content = `<p>Sorry, there is an error loading information about ${query}. Find out some information on Wikipedia by clicking <a href="https://en.wikipedia.org/wiki/${query}" target="_blank">here</a>.</p>`;
            infoData.push(content);
        })

      location['wiki'] = infoData;
      location['wikisource'] = wikisource;
      return true
    })
    this.setState({ locations: locations });
   
  }

  menuClick = () => {
    this.state.sidebarShow === true ? this.setState({sidebarShow: false}) : this.setState({ sidebarShow: true})
  }

    render() {
    return (
      <div className="app">
        <header role="banner">
            <nav className="menu" aria-label="Button to open and close listings" tabIndex="0" onClick={this.menuClick}>
                <span></span>
                <span></span>
                <span></span>
            </nav>
            <h1>Places to Visit In Manila</h1>
        </header>
          <Locations locations={this.state.locations} menu={this.state.sidebarShow}/>     
        
      </div> 
    );
  }
}

export default App;
