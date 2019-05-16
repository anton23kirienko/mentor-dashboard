const func = require('./func.js');

module.exports = insertMentorGithub = (json, data) => {
  data.shift();
  data.forEach(elem => {
    const firstName = elem.values[0].formattedValue;

    if (firstName) {
      const secondsName = elem.values[1].formattedValue;
      const github = func.getGithubFromUrl(elem.values[4].formattedValue);
      const mentor = func.capitalizeString(`${firstName} ${secondsName}`);
      
      json.mentors[mentor].github = github;
    }
  });
}
