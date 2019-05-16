import React, { Component } from 'react';
import Select from 'react-select';
import Table from './../Table/Table.js';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.options = this.getOptions.call(this);
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      activeMentor: ''
    }
  }

  componentWillMount() {
    const defaultValue = window.localStorage.getItem('activeMentor');
    this.setState({activeMentor: defaultValue})
  }

  getOptions() {
    return Object.keys(this.props.data.mentors).map(elem => {
      return {
        value: elem.toLowerCase(),
        label: elem
      }
    });
  }

  handleInput(e) {
    this.setState({activeMentor: e.label});
    window.localStorage.setItem('activeMentor', e.label);
  }

  render() {
    const defaultValue = window.localStorage.getItem('activeMentor');
    return (
      <section className='dashboard'>
        <Select
          options={this.options}
          onChange={this.handleInput}
        />
        <Table
          name={this.state.activeMentor}
          data={this.props.data}
        />
      </section>
    )
  }
}

export default Dashboard;
