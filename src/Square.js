import React, {} from 'react'

export default class Square extends React.Component {
    render() {
      return (
        <button className="square" onClick={() => this.props.abc()}>
          {this.props.value}
        </button>
      );
    }
  }

