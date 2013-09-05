// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/judcdb'
  , db              = mongoose.createConnection(db_lnk)

//var Schema = mongoose.Schema
var usuario_schema = mongoose.Schema({
  nombre        :   {type:String, default:'Jonathan'},
  password   :   String,
  dato: String
  
})



var inscrito_schema = mongoose.Schema({
  //autores
  n_1        :   String,
  n_2        :   String,
  n_3        :   String,

 docentes  : [usuario_schema],
 
  //fecha de inscripcion
  n2   :   String,
  //tema de investigacion
  n3 : String,
    //linea de investigacion
  n4 : String,
    //tutor del trabajo
  n5 : String,
    //asesor del  trabajo
  n6 : String,
    //Departamento
  n7 : String,
    //Carrera
  n8 : String,
    //Area de estudio
  n9 : String,
    //Tipos de trabajo
  n10 : String,
    //ruta de archivo informe
  n11 : String,

  evaluar:{
            j1:String,
            j2:String,
            j3:String,
            nota1:String,
            nota2:String,
            nota3:String,
            promedio:String
          }
  
  
})
// Creación de variables para cargar el modelo
var Usuario = db.model('Usuario', usuario_schema)
var Inscrito = db.model('Inscrito', inscrito_schema)

exports.mostrarinscripcion = function (req, res) {

  // Obtención del parámetro id desde la url
  var id = req.params.id

  Inscrito.findById(id, Irusuario)

  function Irusuario (err, usuarios) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.render('mostrarinscripcion', {title: 'Ver Trabajos', usuarios: usuarios})
  }
}


exports.asignardoc = function (req, res) {

  // Obtención del parámetro id desde la url
  var id = req.params.id

  Inscrito.findById(id, Irusuario)

  function Irusuario (err, usuarios) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.render('asignar', {title: 'Ver Trabajos', usuarios: usuarios})
  }
}

exports.asignarnot = function (req, res) {

  // Obtención del parámetro id desde la url
  var id = req.params.id

  Inscrito.findById(id, Irusuario)

  function Irusuario (err, usuarios) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.render('notas', {title: 'Asignar notas', usuarios: usuarios})
  }
}

exports.inscritos = function (req, res, next) {

  Inscrito.find(Irusuario)

  // NOTA: Creo que es bueno usar verbos en inglés para las funciones,
  //       por lo cómodo que son en estos casos (get, got; find, found)
  function Irusuario (err, usuarios) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.render('inscritos', {title: 'Lista de Trabajos', usuarios: usuarios})
    //return res.render('inscritos', {title: 'Lista de Trabajos', docentes:docentes})
  }
}




var fs=require('fs');//requerir modulo del sistema para escribir Archivos 

exports.inscribir = function (req, res, next) {
  if (req.method === 'GET') {
    return res.render('mostrarinscripcion', {title: 'Nuevo trabajo', usuarios: {}})
  } else if (req.method === 'POST') {

    //sube archivos
    var tmp_path=req.files.miarchivo.path;//ruta del archivo
    var tipo=req.files.miarchivo.type;//tipo del archivo
    
    if(tipo=='application/msword' || tipo=='application/msword' || tipo=='application/pdf'){
      //Si es de tipo png jpg o jpeg
      var aleatorio=Math.floor((Math.random()*9999)+1);//Variable aleatoria
      var nombrearchivo=aleatorio+""+req.files.miarchivo.name;//nombre del archivo mas variable aleatoria

      var target_path='./public/uploads/'+nombrearchivo;// hacia donde subiremos nuestro archivo dentro de nuestro servidor
      fs.rename(tmp_path,target_path,function (err) {//Escribimos el archivo
        //fs.unlink(tmp_path,function (err) {//borramos el archivo tmp
          //damos una respuesta al cliente
        //  res.send('<p>El archivo se subio correctamente</p></br><img  src="./uploads/'+nombrearchivo+'"/>');
        //});
      });

    }else{
      res.send('Tipo de archivo no soportado');
    }
    //**
    // Obtenemos las variables y las validamos
    var n_1      = req.body.n_1   || ''
    var n_2    =   req.body.n_2  || ''
    var n_3    =   req.body.n_3  || ''
    var n2    =    req.body.n2  || ''
    var n3    =    req.body.n3  || ''
    var n4    =    req.body.n4  || ''
    var n5    =    req.body.n5  || ''
    var n6    =    req.body.n6  || ''
    var n7    =    req.body.n7  || ''
    var n8    =    req.body.n8  || ''
    var n9    =    req.body.n9  || ''
    var n10    =   req.body.n10  || ''
    var n11    =   nombrearchivo  || ''
    var j1    =   " "  || ''
    var j2    =   " "  || ''


    

    // Validemos que nombre o descripcion no vengan vacíos
    if ((n_1=== '') || (n_2 === '') || (n_3 === '') || (n3 === '') || (n5 === '')) {
      console.log('ERROR: Campos vacios')
      return res.send('Hay campos vacíos, revisar')
    }

        // Creamos el documento y lo guardamos
    var inscrito = new Inscrito({
        n_1   : n_1
      , n_2   : n_2
      , n_3   : n_3
      , n2    : n2
      , n3    : n3
      , n4    : n4
      , n5    : n5
      , n6    : n6
      , n7    : n7
      , n8    : n8
      , n9    : n9
      , n10   : n10
      , n11   : n11
    })


    inscrito.save(onSaved)

    function onSaved (err) {
      if (err) {
        console.log(err)
        return next(err)
      }

      return res.redirect('/inscritos')
    }
  }  
}

//actualiza los trabajos
exports.asignar = function (req, res, next) {
  var id = req.params.id
      //sube archivos
  var n3    =    req.body.n3  || ''
  var j1    =    req.body.j1  || ''
  var j2    =    req.body.j2  || ''
  var j3    =    req.body.j3;  
  
  // Validemos que nombre o descripcion no vengan vacíos
  if (n3=== '') {
    console.log('ERROR: Campos vacios')
    return res.send('Hay algunos campos sin llenar, revisar')
  }

  Inscrito.findById(id, Irusuario)

  function Irusuario (err, inscrito) {
    if (err) {
      console.log(err)
      return next(err)
    }

    if (!inscrito) {
      console.log('ERROR: ID no existe')
      return res.send('ID Inválida!')
    } else {
      inscrito.n3    = n3
      inscrito.evaluar.j1    = j1
      inscrito.evaluar.j2    = j2
      inscrito.evaluar.j3    = j3


      inscrito.save(onSaved)
    }
  }

  function onSaved (err) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.redirect('/inscritos')
  }
}


exports.notas = function (req, res, next) {
  var id = req.params.id
      //sube archivos
  var n3    =    req.body.n3  || ''
  var nota1    =    req.body.nota1 || ''
  var nota2    =    req.body.nota2 || ''
  var nota3    =    req.body.nota3;  
//  var j3    =    req.body.j3  || ''
  
  // Validemos que nombre o descripcion no vengan vacíos
  if (n3=== '') {
    console.log('ERROR: Campos vacios')
    return res.send('Hay algunos campos sin llenar, revisar')
  }

  Inscrito.findById(id, Irusuario)

  function Irusuario (err, inscrito) {
    if (err) {
      console.log(err)
      return next(err)
    }

    if (!inscrito) {
      console.log('ERROR: ID no existe')
      return res.send('ID Inválida!')
    } else {
      inscrito.n3    = n3
      inscrito.evaluar.nota1    = nota1
      inscrito.evaluar.nota2    = nota2
      inscrito.evaluar.nota3    = nota3



      inscrito.save(onSaved)
    }
  }

  function onSaved (err) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.redirect('/pizarra')
  }
}

//*******

//*******

//actualiza los trabajos
exports.actualizar = function (req, res, next) {
  var id = req.params.id
      //sube archivos
    var tmp_path=req.files.miarchivo.path;//ruta del archivo
    var tipo=req.files.miarchivo.type;//tipo del archivo
    
    if(tipo=='application/msword' || tipo=='application/msword' || tipo=='application/pdf'){
      //Si es de tipo png jpg o jpeg
      var aleatorio=Math.floor((Math.random()*9999)+1);//Variable aleatoria
      var nombrearchivo=aleatorio+""+req.files.miarchivo.name;//nombre del archivo mas variable aleatoria

      var target_path='./public/uploads/'+nombrearchivo;// hacia donde subiremos nuestro archivo dentro de nuestro servidor
      fs.rename(tmp_path,target_path,function (err) {//Escribimos el archivo
        //fs.unlink(tmp_path,function (err) {//borramos el archivo tmp
          //damos una respuesta al cliente
        //  res.send('<p>El archivo se subio correctamente</p></br><img  src="./uploads/'+nombrearchivo+'"/>');
        //});
      });

    }else{
      res.send('Tipo de archivo no soportado');
    }
    //**


  var n_1      = req.body.n_1   || ''
  var n_2    =   req.body.n_2  || ''
  var n_3    =   req.body.n_3  || ''
  var n2    =    req.body.n2  || ''
  var n3    =    req.body.n3  || ''
  var n4    =    req.body.n4  || ''
  var n5    =    req.body.n5  || ''
  var n6    =    req.body.n6  || ''
  var n7    =    req.body.n7  || ''
  var n8    =    req.body.n8  || ''
  var n9    =    req.body.n9  || ''
  var n10    =   req.body.n10  || ''
  var n11    =   nombrearchivo  || ''
  
  // Validemos que nombre o descripcion no vengan vacíos
  if ((n_1=== '') || (n_2 === '')) {
    console.log('ERROR: Campos vacios')
    return res.send('Hay campos vacíos, revisar')
  }



  Inscrito.findById(id, Irusuario)

  function Irusuario (err, inscrito) {
    if (err) {
      console.log(err)
      return next(err)
    }

    if (!inscrito) {
      console.log('ERROR: ID no existe')
      return res.send('ID Inválida!')
    } else {
      inscrito.n_1   = n_1
      inscrito.n_2   = n_2
      inscrito.n_3   = n_3
      inscrito.n2    = n2
      inscrito.n3    = n3
      inscrito.n4    = n4
      inscrito.n5    = n5
      inscrito.n6    = n6
      inscrito.n7    = n7
      inscrito.n8    = n8
      inscrito.n9    = n9
      inscrito.n10   = n10
      inscrito.n11   = n11


      inscrito.save(onSaved)
    }
  }

  function onSaved (err) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.redirect('/inscritos')
  }
}

//*******




exports.borrar = function (req, res, next) {
  var id = req.params.id

  Inscrito.findById(id, Irusuario)

  function Irusuario (err, inscrito) {
    if (err) {
      console.log(err)
      return next(err)
    }

    if (!inscrito) {
      return res.send('Invalid ID. (De algún otro lado la sacaste tú...)')
    }

    // Tenemos el usuario, eliminemoslo
    inscrito.remove(onRemoved)
  }

  function onRemoved (err) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.redirect('/inscritos')
  }
}
