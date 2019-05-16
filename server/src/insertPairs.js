const func = require('./func');

module.exports = insertPairs = (json, data) => {
  data.shift();
  data.forEach(elem => {
    const mentor = func.capitalizeString(elem.values[0].formattedValue);
    const student = elem.values[1].formattedValue.toLowerCase();

    if (mentor in json.mentors) {
      json.mentors[mentor].students[student] = {};
    }
    else {
      json.mentors[mentor] = {};
      json.mentors[mentor].students = {};
      json.mentors[mentor].students[student] = {};
    }
  });
}
