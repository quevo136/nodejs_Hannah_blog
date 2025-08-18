const Course = require('./models/Course');
const {multipleMongooseToObject} = require('../util/mongoose.js');

class SiteController {
  // async index(req, res) {
  //   try {
  //       const data = await Course.find({});
  //       res.json(data);
  //   }  catch (err) {
  //       res.status(400).json({error: err});

  //   }
  // }

  index(req, res, next){
    Course.find({})
      .then(courses =>{      
        res.render('home', {
          courses:multipleMongooseToObject(courses)
        });

      })
      .catch(next);
    
  }



  //GET// search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();
