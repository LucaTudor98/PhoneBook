import React, { Component } from 'react';
import PhoneBook from './PhoneBook';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Basic PhoneBook Application</h1>
        <PhoneBook/>
      </div>
    );
  }
}
