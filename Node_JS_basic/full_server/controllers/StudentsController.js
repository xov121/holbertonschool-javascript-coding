import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(req, res) {
    const databaseFile = process.argv[2];

    readDatabase(databaseFile)
      .then((data) => {
        res.status(200).send(`This is the list of our students\n${StudentsController.formatData(data)}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const databaseFile = process.argv[2];
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(databaseFile)
      .then((data) => {
        const students = data[major] || [];
        res.status(200).send(`List: ${students.join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static formatData(data) {
    let result = '';
    for (const field in data) {
      if (field in data) {
        result += `Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}\n`;
      }
    }
    return result.trim();
  }
}

export default StudentsController;
