const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        let content = data.toString().split('\n');

        let students = content.filter((item) => item);
        students = students.map((item) => item.split(','));

        const NUMBER_OF_STUDENTS = students.length ? students.length - 1 : 0;
        console.log(`Number of students: ${NUMBER_OF_STUDENTS}`);

        const fields = {};
        for (const i in students) {
          if (i !== '0') {
            if (!fields[students[i][3]]) {
              fields[students[i][3]] = [];
            }
            fields[students[i][3]].push(students[i][0]);
          }
        }

        delete fields.field;

        for (const key of Object.keys(fields)) {
          console.log(`Number of students in ${key}: ${fields[key].length}. List: ${fields[key].join(', ')}`);
        }

        resolve();
      }
    });
  });
}

module.exports = countStudents;
