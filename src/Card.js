import React from 'react';
import './Card.css';

export default class Card extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      let color;
      if (this.props.status === 'backlog') {
        color = 'grey';
      } else if (this.props.status === 'in-progress') {
        color = 'blue';
      } else if (this.props.status === 'complete') {
        color = 'green';
      }
      console.log(`Card ${this.props.id} updated to ${color}`);
    }
  }

  render() {
    let className = ['Card'];
    let color;
    if (this.props.status === 'backlog') {
      className.push('Card-grey');
      color = 'grey';
    } else if (this.props.status === 'in-progress') {
      className.push('Card-blue');
      color = 'blue';
    } else if (this.props.status === 'complete') {
      className.push('Card-green');
      color = 'green';
    }
    console.log(`Card ${this.props.id} is now ${color}`);
    return (
      <div className={className.join(' ')} data-id={this.props.id} data-status={this.props.status}>
        <div className="Card-title">{this.props.name}</div>
        {/* <div className="Card-description">{this.props.description}</div> */}
      </div>
    );
  }
}