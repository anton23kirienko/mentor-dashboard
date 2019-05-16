exports.capitalizeString = string => {
  const arr = string.toLowerCase().split(' ');
  return arr.map(el => el[0].toUpperCase() + el.slice(1)).join(' ');
}

exports.getGithubFromUrl = url => {
  const arr = url.split('/');
  let github;
  let splittedStr;

  if (arr.length < 2) github = url.toLowerCase();
  else if (arr.length > 2 && !arr[4]) github = arr[3].toLowerCase();
  else if (arr.length > 4 && !arr[6]) {
    splittedStr = arr[4].toLowerCase();
    github = splittedStr.slice(0, splittedStr.indexOf('-2018q3'));
  }

  return github;
}

exports.getTaskName = (task, json) => {
  const newTaskName = task.replace('-', '').trim();
  const keys = Object.keys(json.tasks);
  let flag = false;
  let existingTaskName;

  keys.forEach(key => {
    const currentKey = key;
    if (key.replace(/ /g, '').toLowerCase() === newTaskName.replace(/ /g, '').toLowerCase()) {
      existingTaskName = currentKey;
      flag = true;
    }
  });

  return flag ? existingTaskName : newTaskName;
}
