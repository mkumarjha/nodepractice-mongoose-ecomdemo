const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65d8cb42ce6f208dc7ebd07a')
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://contectmithilesh1:gAFGKEZPS8acdtBs@cluster0.zz7ascu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{ useNewUrlParser: true , useUnifiedTopology: true }
  )
  .then(result => {
    User.findOne().then(user => {
      if(!user){
        const user = new User({
          name: 'Mithilesh',
          email: 'mithilesh@cluster0.zz7ascu.mong',
          cart: { items: []}
        })
        user.save()        
      }
    });

    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
