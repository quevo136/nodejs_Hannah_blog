const Course = require('./models/Course.js');
const {mongooseToObject} = require('../util/mongoose.js');
const { mongo } = require('mongoose');

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
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
    const course = new Course(formData)
    course.save()
      .then(() => res.redirect('/'))
      .catch(error => {

      })

    //res.send('Course Save')
  }

  edit(req, res, next) {  
    Course.findById(req.params.id)
      .then(course => res.render('courses/edit', {
        course: mongooseToObject(course)
      }))
      .catch(next);
  }

  update(req, res, next) {
    Course.updateOne({_id: req.params.id}, req.body)
      .then(()=> res.redirect('/me/stored/courses'))
      .catch(next);
    
  }

  destroy(req, res, next) {
    Course.deleteOne({_id: req.params.id})
      .then(()=> res.redirect('/me/stored/courses'))
      .catch(next);
    
  }

  
}

module.exports = new CourseController();
