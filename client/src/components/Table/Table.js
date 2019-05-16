import React, { Component } from 'react';
import './Table.css';

class Table extends Component {
  constructor(props) {
    super(props);
  }

  getHeaderRow(studentKeys) {
    return (
      <tr className='table__header-row'>
        <th className='table__header-cell' key='0'></th>
        {studentKeys.map((elem, index) => {
          const link = `https://github.com/${elem}`;
          return (
            <td className='table__body-cell' key={index + 1}>
              <a href={link} className='table__link' target='_blank'>{elem}</a>
            </td>
          )
        })}
      </tr>
    )
  }

  getBodyRows(mentor, taskKeys, studentKeys) {
    let rows;

    if (mentor) {
      const students = mentor.students;
      rows = taskKeys.map((taskName, taskIndex) => {
        return (
          <tr className='table__body-row' key={taskIndex}>
            <th className='table__header-cell' key='0'>
              {this.getLink(taskName)}
            </th>
            {studentKeys.map((studentName, studentIndex) => {
              return this.getCell(students, taskName, studentName, studentIndex);
            })}
          </tr>
        )
      });
    }

    return mentor ? rows : null;
  }

  getColorSpecification() {
    return (
      <div className="table__specification">
        <div className="specification__item specification__item_checked">
          <span>checked</span>
        </div>
        <div className="specification__item specification__item_nomark">
          <span>no mark</span>
        </div>
        <div className="specification__item specification__item_progress">
          <span>in progress</span>
        </div>
        <div className="specification__item specification__item_todo">
          <span>todo/no-status</span>
        </div>
        <div className="specification__item specification__item_checking">
          <span>should be checked</span>
        </div>
      </div>
    )
  }

  getCell(students, taskName, studentName, studentIndex) {
    const task = this.props.data.tasks[taskName];
    const taskClass = task.taskStatus.replace(/ /g, '').toLowerCase();
    const taskIsChecked = taskName in students[studentName];
    let className;

    if (taskIsChecked) {
      className = 'table__body-cell table__body-cell_checked-mark';
    }
    else {
      className = taskClass === 'checked'
        ? `table__body-cell table__body-cell_checked-nomark`
        : `table__body-cell table__body-cell_${taskClass}`;
    }

    return <td className={className} key={studentIndex + 1}></td>
  }

  getLink(taskName) {
    const link = this.props.data.tasks[taskName].taskLink;
    return link === 'no-link'
      ? taskName
      : <a href={link} className='table__link' target='_blank'>{taskName}</a>
  }

  render() {
    const tasks = this.props.data.tasks;
    const mentors = this.props.data.mentors;
    const mentor = mentors[this.props.name];
    const taskKeys = mentor ? Object.keys(tasks) : [];
    const studentKeys = mentor ? Object.keys(mentor.students) : [];
    const table = (
      <div>
        <div className='table__caption'>
          <span>Mentor: {mentor ? mentor.github : ''}</span>
        </div>
        <table className='table'>
          <thead className='table__header'>
            {this.getHeaderRow(studentKeys)}
          </thead>
          <tbody className='table__body'>
            {this.getBodyRows(mentor, taskKeys, studentKeys)}
          </tbody>
        </table>
        {this.getColorSpecification()}
      </div>
    );

    return mentor ? table : null;
  }
}

export default Table;
