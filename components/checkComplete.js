/*Creamos nuestro elemento HTML del botón del check*/
//Le pasamos el id que es el identificador que nos ayudará a poder saber si la tarea se realizó para marcarla.
const checkComplete = (id) =>  {
  //Con esto creamos nuestro elemento que será el check;
  const i = document.createElement("i");
  i.classList.add("far", "fa-check-square", "icon");
  //Cada vez que se haga click se mandará a llamar a la función completeTask para que nos cambie a azul el ícono como tarea realizada.
  //Le pasaremos una función que va a recibir como parámetro el evento.
  //Esta función tendrá 2 parámetros el evento y el identificador.
  i.addEventListener("click", (event) => completeTask(event, id));
  return i;

};

/*Funcion que se va a ejecutar luego de darle click a nuestro elemento CheckComplete*/
//Con esto cambiaremos el estilo del icono del check a azul para que se vea como que fue marcada la tarea.
//Tiene como parámetro el evento y el identificador de cada tarea.
const completeTask = (event, id) => {
//event.target es para acceder al objeto
  
  const element = event.target;
  /*
  //Agregamos una clase:
  element.classList.add("fas");
  //Agregamos el color al icono:
  element.classList.add("completeIcon");
  //Quitamos una clase:
  element.classList.remove("far");*/

  //Reemplazaremos esto de arriba por Toggle

  //Con esto cambiamos el color del check
  //Usaremos la funcion toggle que si existe la clase la quita y si no la pone asi podemos seleccionar y desseleccionar el check.
  element.classList.toggle("fas");
  element.classList.toggle("completeIcon");
  element.classList.toggle("far");

  // immediately invoked function expression o IIFE:
  //Usaremos esto para que sea más seguro nuestro código, son funciones que en cuanto se declaran se ejecutan.

  //Usaremos esto para ver si nos sale nuestro id.
  console.log("check id", id);

  //Vamos a crear una constante para ver nuestro arreglo que está almacenado en local storage
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  //El método findIndex() devuelve el índice del elemento de un array (O sea su posición dentro de este).
  //Vamos a decir que item.id sea igual al identificador que nosotros estamos recibiendo en esta función. 
  const index = tasks.findIndex( item => item.id === id );
  console.log(index);

  //Con esto podremos modificar el estado de nuestra tarea o sea si hicimos la tarea o no.
  //Dentro del tasks sabemos que queremos acceder a cierto index(posicion) y dentro de esa posición queremos acceder a la llave complete.
  //vamos a negar el valor que se tiene almacenado, si está false y lo negamos, se vuelve true y si está true y lo negamos, se vuelve false. 
  //Nuestras tareas siempres están al inicio en false porque no la hicimos aún
  tasks[index]["complete"] = !tasks[index]["complete"];

  //Necesitamos es volver a guardar ese arreglo dentro del local Storage para almacenar el nuevo estado de nuestra tarea.
  //Mandamos como primer parámetro nuestro arreglo del localStorage
  //El método setItem() de la interfaz Storage, cuando reciba una clave y un valor, añadirá estos al almacén, o actualizará el valor si la clave ya existe. 
  //Segundo parámetro JSON.stringify() convierte un objeto o valor de JavaScript en una cadena de texto JSON en este caso recibe nuestra lista.
  localStorage.setItem("tasks", JSON.stringify(tasks));

};

 //Exportaremos nuestro  archivo para poder importarlo en el archivo principal de script.js
 export default checkComplete;