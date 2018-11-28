//Login con google
//paso 1
var provider = new firebase.auth.GoogleAuthProvider();

//JQUERY agarra el id
$('#root')
//agarra el boton para observar
//para el inicio de secion la primera parte del paso 5
$('#login').click(function(){
	firebase.auth().signInWithPopup(provider).then(function(result) { 
		console.log(result.user);//el observador del boton para pedoir dtos del usuario
//referenciando el boton para olvidarlo y mostrar la foto
		guardarDatos(result.user);
		$('#login').hide();
		$('#root').append("<img src='"+result.user.photoURL+"'/>")


	});

});
//4 y para guardar automaticamente

function guardarDatos(user){
	var usuario = {
		uid:user.uid,//para un id automatico
		nombre:user.displayName,
		email:user.email,
		foto:user.photoURL
	}
	firebase.database().ref("datos1/" + user.uid)
	.set(usuario) //para que lo hafa de morma automatica
}
//3 escribir en la BD
$('#guardar').click(function(){
	firebase.database().ref("datos2")//rama de la BD\
	.set({
		nombre:"Alexis",
		edad:"26",
		sexo:"F"
	})
});

//para leer la BD
//on child adder cuando alguien agrega un hijo a la rama, haga algo dentro el parentesis
//s es para el snap  del usuario
//captar la foto en automatico
//lo hace varias veces por el usuario

firebase.database().ref("datos1")
.on("child_added", function(s){
	var user=s.val();
	$('#root').append("<img width='100px' src='"+user.foto+"'/>")


})


