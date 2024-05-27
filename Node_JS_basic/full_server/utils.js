import fs from 'fs';

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter(line => line);
        const fields = {};

        lines.slice(1).forEach((line) => {
          const [firstName, , , field] = line.split(',');
          if (!fields[field]) fields[field] = [];
          fields[field].push(firstName);
        });

        resolve(fields);
      }
    });
  });
}

export default readDatabase;
