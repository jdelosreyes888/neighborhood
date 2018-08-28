import  React, { Component } from 'react'
import './Infowindow.css'

// credit: https://github.com/fullstackreact/google-maps-react
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class Container extends Component {
  
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
  
  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
});


   render() {
        const style = {
            width: '100vw',
            height: '100vh'
          }
      
      return (
        <main className={this.props.menu === true? "map" : "fullMap"} aria-label="Google map with different markers" role="application" >
        <Map google={this.props.google} style={style}
        initialCenter={{
          lat:  14.590155,
          lng:  120.979107
        }}
        zoom={14}>
 

        {this.props.locations.map((location) => (
          
           <Marker onClick={this.onMarkerClick} 
              key={location.id}
              title={location.title} 
              name={location.title} 
              content={location.content}
              wiki={location.wiki}
              wikisource={location.wikisource}
              position={{lat: location.location.lat, lng: location.location.lng }}  
              ref={this.props.setMarkers}
              aria-label="Location marker"/>
          ))
        }
        
  
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          maxWidth={350} 
          aria-label="Information window for locations"
          >
            <div className="infoWindow">
              <h1>{this.state.selectedPlace.name}</h1>
              <p >{this.state.selectedPlace.content}</p>
              <p className="details">{this.state.selectedPlace.wiki}</p>
              <p className="readMore">Read more details on <a target="_blank" href={this.state.selectedPlace.wikisource}>Wikipedia</a></p>
            </div>
        </InfoWindow>
  
        </Map>
      </main>
      )
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyDjwWlv6PwXGcTReml_xrL-XJsV7IO1C4U&v=3'
  })(Container)
  