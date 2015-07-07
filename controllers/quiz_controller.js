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
// Autoload - Factoriza el código si ruta incluye :quizID
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
     function(quiz) {
        if (quiz) {
	  req.quiz = quiz;
	  next();
	} else {next(new Error('No existe quizId=' + quizId));}
     }
    ).catch(function(error) {next(error);});
};

// GET /quizes
exports.index = function(req, res) {
  var condicion_busqueda;
  if (req.query.search) {
	condicion_busqueda="%"+req.query.search.replace(" ","%")+"%";
  }
  else {
	condicion_busqueda="%"
  }
  models.Quiz.findAll({where:["pregunta like ? ",condicion_busqueda],order:'pregunta ASC'}).then(function(quizes) {
    res.render('quizes/index.ejs', {quizes: quizes, errors:[]});
  }
 ).catch(function(error) {next(error);})
};


//Get /quizes/:id
exports.show = function(req,res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', {quiz: req.quiz, errors:[]});
  })
};

//Get /quizes/:id/answer
exports.answer = function(req,res) {
   var resultado = 'Incorrecto';
   //models.Quiz.findById(req.params.quizId).then(function(quiz) {
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
		// res.render('quizes/answer',{ quiz: req.quiz, respuesta: 'Correcto'});
	}
	res.render('quizes/answer',{ quiz: req.quiz,
				     respuesta: resultado,
				     errors:[]});
	// else {
	//	res.render('quizes/answer',{ quiz: req.quiz,respuesta: 'Incorrecto'});
	// }
   // })
};

// Get /quizes/new
exports.new=function(req,res) {
   var quiz = models.Quiz.build( // crea objeto quiz
      {pregunta:"Pregunta", respuesta: "Respuesta"}
   );
   res.render('quizes/new', {quiz:quiz, errors:[]});
};
// Get /quizes/create
exports.create=function(req,res) {
   var quiz = models.Quiz.build(req.body.quiz);

   quiz
   .validate()
   .then(
	function(err){
	  if(err){
	     res.render('quizes/new',{quiz: quiz, errors:  err.errors});
          } else {
		quiz //quiz guarda en DB los campos pregunta y respuesta de quiz
   		.save({fields:["pregunta","respuesta"]})
		.then(function() {
      		res.redirect('/quizes')})
           }  // res.redirect: redirección HTTP a lista de de preguntas
        }
       ); 
};

// PUT /quizes/id
exports.update=function(req,res) {
   req.quiz.pregunta = req.body.quiz.pregunta;
   req.quiz.respuesta = req.body.quiz.respuesta;

   req.quiz
   .validate()
   .then(
	function(err){
	  if(err){
	     res.render('quizes/edit',{quiz: quiz, errors:  err.errors});
          } else {
		req.quiz //save: guarda campos pregunta y respuesta en DB
   		.save({fields:["pregunta","respuesta"]})
		.then(function() {
      		res.redirect('/quizes');});
           }  // res.redirect: redirección HTTP a lista de de preguntas (URL relativo)
        }
       ); 
};


//Get /quizes/:id/edit
exports.edit = function(req, res) {
	var quiz=req.quiz; // autoload de instancia de quiz
	res.render('quizes/edit', {quiz: quiz, errors: []});
};
	
//Get /author
exports.author = function(req,res) {
	res.render('author');
};
