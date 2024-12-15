const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/student');

const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
// Display all students and the form
app.get('/', async (req, res) => {
    const students = await Student.find();
    res.render('index', { students });
});

// Add a new student
app.post('/add', async (req, res) => {
    const { rollno, name, degree, city } = req.body;
    const newStudent = new Student({ rollno, name, degree, city });
    await newStudent.save();
    res.redirect('/');
});

// Delete a student by ID
app.post('/delete/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
