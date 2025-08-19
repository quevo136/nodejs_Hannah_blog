const Course = require('./models/Course.js');
const {multipleMongooseToObject} = require('../util/mongoose.js');

class MeController {

  //GET// search
  storedCourses(req, res, next) {
    Course.find({})
      .then(courses => res.render('me/stored-courses',{
        courses: multipleMongooseToObject(courses)
      }))
      .catch(next);
  }
}

module.exports = new MeController();
