const func = require('./func.js');

module.exports = insertTasks = (json, data) => {
  data.shift();
  data.forEach(elem => {
    const taskName = func.getTaskName(elem.values[0].formattedValue, json);
    const taskStatus = elem.values[2].formattedValue;
    const taskLink = elem.values[1].formattedValue
      ? elem.values[1].formattedValue
      : '';

    json.tasks[taskName] = {};
    json.tasks[taskName].taskLink = taskLink;
    json.tasks[taskName].taskStatus = taskStatus;
  });
}
