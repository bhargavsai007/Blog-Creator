const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


const dbURI = "Replace this string with your DB string for connecting to the DB";

// express app
const app = express();

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(process.env.PORT || 5000))
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});