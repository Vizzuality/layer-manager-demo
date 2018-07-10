import React, { Component } from 'react';

class Search extends Component {
  render() {
    const {
      className,
      apiUrl,
      handleSubmit,
      handleInputChange
    } = this.props;
    return (
      <form className={`c-search ${className || ''}`} onSubmit={handleSubmit}>
        <input placeholder="Enter and RW API url..." type="text" className="input" value={apiUrl} onChange={handleInputChange} />
      </form>
    );
  }
}

export default Search;
