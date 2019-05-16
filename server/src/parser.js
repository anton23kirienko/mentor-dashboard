const getFileByAuth = require('./auth');
const insertPairs = require('./insertPairs');
const insertMentorGithub = require('./insertMentorGithub');
const insertTasks = require('./insertTasks');
const insertScore = require('./insertScore');

module.exports = parseFiles = () => {
  const json = {
    mentors: {},
    tasks: {}
  };
  const filesIdArr = [
    '1-HYzpnEYpIsv5qSSuSZCgKf5-mYnG0T3Xt864Hhdnew',
    '1uojrkWfoLh9oTKxLWCdirrNJYGVfCtiF9RlZrwsxSbo',
    '18exMEOWGKsMPggt0t3yU-MR1gvX3OFBDqKCvdNy8rAU'
  ]

  return Promise.all(filesIdArr.map(elem => getFileByAuth(elem)))
    .then(res => {
      const sheets = res.map(elem => elem.data.sheets);
      const pairsData = sheets[0][0].data[0].rowData;
      const githubData = sheets[0][1].data[0].rowData;
      const tasksData = sheets[1][0].data[0].rowData;
      const scoreData = sheets[2][0].data[0].rowData;

      insertPairs(json, pairsData);
      insertMentorGithub(json, githubData);
      insertTasks(json, tasksData);
      insertScore(json, scoreData);

      return json;
    })
}
