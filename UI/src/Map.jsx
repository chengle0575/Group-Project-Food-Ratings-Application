import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import markerIcon from './assets/map_marker.png'; // Import the marker icon


// Define the height of the map
const mapHeightNum = 400;
const mapHeight = `${mapHeightNum}px`;

// Define what other APIs needed
const libraries = ["places"];

class MapElement extends React.Component {
    constructor(props) {
        super(props);
        // Initialize state
        this.state = {
          // Center of the map
          center: {
            lat: 1.287953,  // Do not change! Singapore center coordinates
            lng: 103.851784  // Do not change! Singapore center coordinates
          },
          activeMarker: null, // The active marker
          // Array to store places returned by the Places API
          places: [],
          // Search term for the Places API
          searchTerm: '',
          // General position in Singapore
          generalPosition: '',
          selectedPlaceID: null,
        };
    }
    // Function to handle a click on a place
   handlePlaceClick = async (place) => {
    this.setState({ selectedPlaceID: place.place_id, activeMarker: place.place_id })
    this.props.handleSelectedPlaceIDChange(place.place_id)
    this.props.handlePlaceNameChange(place.name)
    this.props.handlePlaceAddress(place.formatted_address)
    console.log('place:', place)
  };


    // Update searchTerm in state when search input changes
    onSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    // Update generalPosition in state when position input changes
    onPositionChange = (event) => {
      if (event.target.value === '') {
        this.setState({
          generalPosition: '',
          center: {
            lat: 1.287953,  // Singapore center coordinates
            lng: 103.851784  // Singapore center coordinates
          }
        });
      } else {
        const stationName = `${event.target.value} MRT Station`;
        this.setState({ generalPosition: stationName });
      }
    };

    // Search for places based on searchTerm and generalPosition
    searchPlaces = () => {
      // Create a Geocoder object for converting addresses into geographic coordinates
      const geocoder = new window.google.maps.Geocoder();
      // Create a PlacesService object for searching for places
      const service = new window.google.maps.places.PlacesService(this.map);

      // Function to perform the search
      const performSearch = (position) => {
        // Define the request
        const request = {
          query: this.state.searchTerm,
          location: position,
          radius: '5000',
          type: ['restaurant']
        };

        // Perform the text search
        service.textSearch(request, (results, status) => {
          // If the search was successful, update places in state
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            this.setState({
              places: results,
            });
          }
        });
      };

      // If no general position is provided, perform the search based on the current center
      if (!this.state.generalPosition) {
        performSearch(this.state.center);
        return;
      }

      // Convert the general position into geographic coordinates and perform the search
      geocoder.geocode({ address: this.state.generalPosition }, (results, status) => {
        if (status !== window.google.maps.GeocoderStatus.OK) {
          alert('Unable to find input MRT station. Please input a valid MRT station.');
          return;
        }

        const position = results[0].geometry.location;
        this.setState({ center: position });
        performSearch(position);
      });
    };

    // Save the map object when the map is loaded
    onMapLoad = (map) => {
      this.map = map;
    };

    render() {
        // Define the style for the map container
        const containerStyle = {
            width: '100%',
            height: mapHeight
        };
    
        return (
            <LoadScript googleMapsApiKey="AIzaSyB1jaU8QLxzSmiFSB1Oa4g89KXnkHs0U8Y" libraries={libraries}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={this.state.center}
                  zoom={12}
                  onLoad={this.onMapLoad}
                  onPlaceClick={this.handlePlaceClick}
                >
                  {this.state.places.map((place, i) => (
                    
                    <Marker 
                      key={i} 
                      position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} 
                      onClick={() => this.handlePlaceClick(place)}
                      icon={
                        this.state.activeMarker === place.place_id
                          ? {
                            url: markerIcon,
                            scaledSize: new window.google.maps.Size(40, 70),
                            labelOrigin:new google.maps.Point(20,-15)
                            }
                          : undefined
                      }
                      label={this.state.activeMarker === place.place_id ?
                        {
                          text:`${place.name}${place.formatted_address}`,
                          className:"labelOnMap",
                        } : undefined
                            
                        }
                       
                    />
                     
                    
                                       
                  ))}
                </GoogleMap>
                <div className="container mt-3">
                  <div className="row">
                      <div className="col-md-4">
                          <input
                              type="text"
                              className="form-control mb-2"
                              placeholder="Search for a restaurant"
                              onChange={this.onSearchChange}
                          />
                      </div>
                      <div className="col-md-4">
                          <input
                              type="text"
                              className="form-control mb-2"
                              placeholder="Enter a MRT station"
                              onChange={this.onPositionChange}
                          />
                      </div>
                      <div className="col-md-4">
                          <button onClick={this.searchPlaces} className="btn btn-primary">
                              Find a restaurant
                          </button>
                      </div>
                  </div>
              
                </div>
            </LoadScript>
        );
    }
}

export default MapElement;
