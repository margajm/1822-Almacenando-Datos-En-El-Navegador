//Cada vez que cambiamos algo dentro de nuestro proyecto debemos mandar llamar a la funcion displayTasks.
import { displayTasks } from "./readTasks.js";

//Crearemos el elemento que nos ayudará a eliminar la tarea:
 //En este caso es un ícono
 //Le pasamos el id que es el identificador de cada tarea.
 const deleteIcon = (id) => {
      //Generamos un elemento i
        const i = document.createElement("i");
        //Generamos las clases
        i.classList.add("fas", "fa-trash-alt", "trashIcon", "icon");
        //Agregamos el listener que será el click y luego la función como segundo parámetro donde allí pondremos también al identificador.
        i.addEventListener("click",() => deleteTask(id));
        return i;

 };

//Creamos la función del listener o sea el segundo parámetro sobre lo que se ejecutará.
//Ya no pondremos al event porque cada vez que existe un cambio dentro de nuestro proyecto, lo que estamos haciendo es :
//volver a leer la información que se encuentra actualmente en localStorage y simplemente crear la estructura o crear el HTML con CCS cada vez que se hace un cambio.
//Pondremos al identificador que nos ayudará a saber cual es la tarea por su identificación que tiene cada tarea.. 
 const deleteTask = (id) => {
      //Necesitamos seleccionar la lista que es el elemento padre de cada card o tarea  para poder eliminarlos visualmente.
      const li = document.querySelector("[data-list]");

      //vamos a volver a obtener la información que se encuentra actualmente en localStorage.
      ////Accedemos al localStorage
      //Decimos que queremos obtener la información con getItem
      //Información de lo que está dentro de los paréntesis, en este caso del objeto tasks.
      //JSON.parse : Como nos devolverá el objeto en formato JSON para manipularlo debemos convertirlo a formato JavaScript con eso.
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      
      //Con esto sabremos que elemento de cual posicion estamos eliminando.
      //El método findIndex() devuelve el índice del elemento de un array.
      //Vamos a llamar lo que recibimos como item, 
      //Vamos a decir que item.id sea igual al identificador que nosotros estamos recibiendo en esta función. 
      const index = tasks.findIndex((item) => item.id === id);
      console.log(index);

      //Método splice cambia el contenido de un array eliminando elementos existentes, y/o agregando nuevos elementos.
      //En este caso lo que nosotros queremos es eliminar elementos
      //Primero va a recibir el index donde va a empezar y luego el número de elementos que queremos se eliminen.
      //Cuando nosotros le estamos dando clic a cada uno de los elementos, pues lo que nos va a regresar es un arreglo,
      //Pero ya sin el elemento que nosotros estamos dándole clicK.
      tasks.splice(index,1);
      //Vamos a decir que li la card padre será igual a un string vacío para eliminarla visualmente.
      li.innerHTML = "";

      // Necesitamos que tasks que es nuestras lista del arreglo actualizada(sin el elemento eliminado) volvérselo a mandar o volverlo a almacenar dentro de localStorage.
      //El método setItem() de la interfaz Storage, cuando reciba una clave y un valor, añadirá estos al almacén, o actualizará el valor si la clave ya existe. 
      //Le mandamos como parámetro tasks que es nuestra lista
      //Luego stringify que convertirá un objeto (nuestra lista en este caso (tasks)) o valor de JavaScript en una cadena de texto JSON.
      localStorage.setItem("tasks", JSON.stringify(tasks));
      
      //Cada vez que existiera un cambio o cada vez que hay un cambio dentro de nuestro proyecto, hay que mandar a llamar la función displayTasks.
      //Porque esta función cada vez que se carga la página, muestra las tareas que existen.
      //Así lograremos que se elimine la tarea también visualmente de forma automático y no solo en el local Storage y tener que actualizar la página.
      displayTasks();
 };

//Exportaremos nuestro  archivo para poder importarlo en el archivo principal de script.js
export default deleteIcon;