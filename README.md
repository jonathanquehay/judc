judc
====

Plataforma de evaluación JUDC 2013 - UNAN FAREM Chontales

Yo estoy realizando un sitio web de evaluaciones para unas jornadas universitarias lo que necesito es hacer lo siguiente
 
1- Existe autenticacion de los docentes este es un esquema (tabla como se llama en mySql), en la cual se tiene el nombre,
usuario y la contraseña eso ya lo tengo listo.
 
var usuario_schema = mongoose.Schema({
  nombre        :   {type:String, default:'Jonathan'},
  password   :   String,
  dato: String
  
})
 
2- Existe tambien otro esquema que lo utilizo para la inscripcion de los estudiantes (usuarios) que lo mandan desde el frontend (vista)
var inscrito_schema = mongoose.Schema({
  //autores
  n_1        :   String,
  n_2        :   String,
  n_3        :   String,
 
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
//donde va la parte evaluativa
  evaluar:{
            j1:String,
            j2:String,
            j3:String,
            nota1:String,
            nota2:String,
            promedio:String
          }
  
  
})
 
3- Dentro de la parte administrativa tengo que asignar docentes como jurado y si te fijas ya tengo en el esquema el evaluar que trae ya j1, j2 y j3 que son los jurados.
 
4- Hasta el momento voy trabajando la asignación de jurados y tambien la parte de evaluaciones
