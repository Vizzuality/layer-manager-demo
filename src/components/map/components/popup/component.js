import React, { Component } from 'react';
import Select from 'react-select';

class Popup extends Component {
  render() {
    const {
      data,
      interactionLayers,
      selectedLayer,
      setInteractionSelected
    } = this.props;
    return (
      <div className="c-popup">
        {interactionLayers && interactionLayers.length > 0 &&
          <select
            className="layer-select"
            name="interactionLayers"
            value={selectedLayer}
            onChange={e => setInteractionSelected(e.target.value)}
          >
            {interactionLayers.map(o =>
              <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        }
        <div className="values">
          {data && data.map(d => (
            <div key={d.label} className="wrapper">
              <div className="label">{d.label}:</div>
              <div className="value">{d.value || 'n/a'}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Popup;
