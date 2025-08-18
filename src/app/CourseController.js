const Course = require('./models/Course.js');
const {mongooseToObject} = require('../util/mongoose.js');

class CourseController { 
  show(req, res, next) {
    Course.findOne({slug: req.params.slug})
      .then((course) =>{
        res.render('courses/show', {course: mongooseToObject(course)})

      })
      .catch(next);
    //req.params.slug
    //res.send('Course details');
  }

  create(req, res, next) {    
    res.render('courses/create');
  }
  store(req, res, next) {   
    const formData = req.body; 
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/0.jpg`
    const course = new Course(formData)
    course.save()
      .then(() => res.redirect('/'))
      .catch(error => {
        
      })

    res.send('Course Save')
  }
}

module.exports = new CourseController();
