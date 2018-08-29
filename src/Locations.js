import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Container from './Container'


 class Locations extends Component {

  state = {
      query: "",
      markers: []
  }
  
   // passes an empty array all markers data
   setMarkers = (marker) => {    
    if (marker !== null) {
      this.state.markers.push(marker)
    }    
  }

  // This will update in showing the list of locations
  updateQuery = (query)=> {
    this.setState({
        query: query.trim() 
    });
  }

  // triggers marker event - animate the marker and opens infowindow
  onLocationClick = (location) => {
    this.state.markers.forEach((marker) => {
      if (location.title === marker.marker.name) {
        new marker.props.google.maps.event.trigger( marker.marker, 'click') // custom event triggered
      }
    })
  }
  render() {
      let showingLocations
      const notify = "Hmmm... it seems we don't have that listing. Please try again."

      if (this.state.query) {
          const match = new RegExp(escapeRegExp(this.state.query), 'i')
          showingLocations = this.props.locations.filter((location) => match.test(location.title))
          
      } else {
          showingLocations = this.props.locations;
      }
    
      showingLocations.sort(sortBy('title'))

    return (
      <div className="main">
      <aside className={this.props.menu === true? "sidebar" : "hidden"} >
      
      <input type='text' placeholder='Search for historical places' value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)} tabIndex={this.props.menu === true? '0' : '-1'} aria-label="Filter locations"/>
      
      <ul className="nav" >        
           {showingLocations.length === 0? <p className="notify">{notify}</p> : 
            showingLocations.map((location) => (
                <li key={location.id}>
                    <button onClick={() => this.onLocationClick(location)} tabIndex={this.props.menu === true? '0' : '-1'} aria-label={location.title}>{location.title}</button>
                </li>
            ))}
        </ul>
        <footer>
          <h2>Udacity Neighborhood Project</h2>
          <p>Front End Web Development</p>
        </footer>
     </aside>      
     
     <Container locations={showingLocations} 
        setMarkers={this.setMarkers}
        menu={this.props.menu}
        issue={this.props.issue}
        />
    </div>
    )
  }
}

export default Locations;
