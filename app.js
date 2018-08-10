'use strict';
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

app.use(require('morgan')('dev'));

app.use('/updates/releases', express.static(path.join(__dirname, 'releases')));

app.get('/updates/latest', (req, res) => {
  const latest = getLatestRelease();
  const clientVersion = req.query.v;
  if (clientVersion === latest) {
    res.status(204).end();
  } else {
console.log(latest);
    res.status(200).json({
      url: `${getBaseUrl()}/releases/darwin/${latest}/Parts_Wizz_${latest}.exe`
    });
  }
});

let getLatestRelease = () => {
  const dir = `${__dirname}/releases/darwin`;

  const versionsDesc = fs.readdirSync(dir).filter((file) => {
    const filePath = path.join(dir, file);
    return fs.statSync(filePath).isDirectory();
  }).reverse();

  return versionsDesc[0];
}

let getBaseUrl = () => {
    return 'http://localhost:3000';
  // if (process.env.NODE_ENV === 'development') {
  // } else {
  //   return 'http://download.mydomain.com'
  // }
}

app.listen(8080, () => {
  console.log(`Express server listening on port ${8080}`);
});