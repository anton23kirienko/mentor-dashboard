const func = require('./func.js');

module.exports = insertScore = (json, data) => {
  const mentorList = Object.keys(json.mentors);

  data.shift();
  data.forEach(elem => {
    const mentorGithub = func.getGithubFromUrl(elem.values[1].formattedValue);
    const studentGithub = func.getGithubFromUrl(elem.values[2].formattedValue);
    const task = func.getTaskName(elem.values[3].formattedValue, json);
    const mark = elem.values[5].formattedValue;

    if (!(task in json.tasks)) {
      json.tasks[task] = {};
      json.tasks[task].taskLink = 'no-link';
      json.tasks[task].taskStatus = 'no-status';
    }

    mentorList.forEach(mentorName => {
      if (studentGithub in json.mentors[mentorName].students) {
        json.mentors[mentorName].students[studentGithub][task] = mark;
      }
    });
  });
}
