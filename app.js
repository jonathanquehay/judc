
/**
 * Module dependencies.
 */
// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/judcdb'
  , db              = mongoose.createConnection(db_lnk)


var express = require('express')
  //, routes = require('./routes')
  //, user = require('./routes/user')
  , http = require('http')
  ,	mongoose = require('mongoose')
  , path = require('path');
 var usuario  = require('./controllers/docentes')
  var inscrito  = require('./controllers/usuarios')


var app = module.exports = express.createServer();
var app = express();
// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view options', { layout: true });
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser('your secret here'));
  app.use(express.methodOverride());
  app.use(express.session());
  app.use(app.router);
  app.use(express.static('./public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', usuario.index)

app.get('/pizarra', usuario.pizarra)

app.get('/pantalla', usuario.pantalla2)

app.post('/pantalla',usuario.pantalla)

app.get('/admin',login, usuario.admin)

app.post('/autenticar',usuario.autenticar)

app.get('/usuario/:id', usuario.show_edit)

app.post('/usuario/:id', usuario.update)

app.get('/delete-usuario/:id', usuario.remove)

app.get('/nuevo-usuario', usuario.create)

app.post('/nuevo-usuario', usuario.create)

//Inscripccion de trabajos

app.get('/mostrarinscripcion', inscrito.mostrarinscripcion)

app.get('/inscrito/:id', inscrito.mostrarinscripcion)

app.post('/inscrito/:id', inscrito.actualizar)

app.post('/asignar/:id', inscrito.asignar)

app.post('/notas/:id', inscrito.notas)

app.get('/notas/:id', inscrito.asignarnot)

app.get('/asignar/:id', inscrito.asignardoc)

app.get('/borrar-inscrito/:id', inscrito.borrar)

app.get('/inscritos',login, inscrito.inscritos)

app.get('/nuevo-trabajo', inscrito.inscribir)

app.post('/nuevo-trabajo', inscrito.inscribir)



//*******
//FUNCION PARA VALIDAR LA INSERCION DE USUARIO
function login(req, res, next){
	if(req.session.user){
		next();

	}else{
		res.redirect('/login');
	}
};


app.get('/login', function(req,res){
	res.render('login', {title: 'Ingreso'});
});


//FUNCION PARA CERRAR LA SESION Y VOLVER A LA PAGINA PRINCIPAL
app.get('/salir', function(req, res){
	delete req.session.user;
	res.redirect('/');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
