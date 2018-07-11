import React, { Component } from 'react';

class Map extends Component {
  render() {
    return (
      <div id="c-map" className="c-map">
        {this.props.children}
      </div>        
    ); 
  }
}

export default Map;
