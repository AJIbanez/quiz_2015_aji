var models = require('../models/models.js');
/*//Get /quizes/question
exports.question = function(req,res) {
  models.Quiz.findAll().then(function(quiz) {
    res.render('quizes/question', { pregunta:quiz[0].pregunta})
  })
};

//Get /quizes/answer
exports.answer = function(req,res) {
   models.Quiz.findAll().then(function(quiz) {
	if (req.query.respuesta === quiz[0].respuesta) {
		res.render('quizes/answer',{respuesta: 'Correcto'});
	}
	else {
		res.render('quizes/answer',{respuesta: 'Incorrecto'});
	}
   })
};

//Get /author
exports.author = function(req,res) {
	res.render('author');
};*/
// GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index.ejs', {quizes: quizes});
  })
};


//Get /quizes/:id
exports.show = function(req,res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', {quiz: quiz});
  })
};

//Get /quizes/:id/answer
exports.answer = function(req,res) {
   models.Quiz.findById(req.params.quizId).then(function(quiz) {
	if (req.query.respuesta === quiz.respuesta) {
		res.render('quizes/answer',{ quiz: quiz, respuesta: 'Correcto'});
	}
	else {
		res.render('quizes/answer',{ quiz: quiz,respuesta: 'Incorrecto'});
	}
   })
};

//Get /author
exports.author = function(req,res) {
	res.render('author');
};
