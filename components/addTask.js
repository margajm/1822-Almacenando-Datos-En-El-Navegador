//Importaremos nuestro archivo de checkComplete
import checkComplete from "./checkComplete.js"
//Importaremos nuestro archivo deleteIcon
import deleteIcon from "./deleteIcon.js"
//Importaremos nuestra función de readTasks
//Que se encarga de poner cada uno de los elementos dentro de la lista cada vez que estamos agregando una nueva tarea.
import{displayTasks} from "./readTasks.js"

/*Esta arrow function se encargará de añadirnos la tarea a la lista de tareas*/
//toda la información tanto del texto que puso el usuario como la fecha, quedan en la función addTask
//Esta función recibe un evento y este evento genera el formulario.
export const addTask = (evento) => {

    //Pondremos esto para prevenir el comportamiento que tiene por defecto un formulario.
    evento.preventDefault();

    //Nos trae la lista que es el elemento en el cual nosotros vamos a ir agregando las tareas.
    const list = document.querySelector("[data-list]");
    /*Obtenemos el recuadro donde escribe el usuario de la tarea que desea realizar*/
    const input = document.querySelector('[data-form-input]');
    /* Obtenemos el calendario en el cual selecciona la fecha el usuario.*/
    const calendar = document.querySelector('[data-form-date]');

//Aqui tenemos el valor del input es decir lo que escribió el usuario.
    const value = input.value;
    /*Aquí obtenemos el valor de la fecha que elejimos en el calendario pero en un formato diferente al usual.*/
    const date = calendar.value;
    /*
    Esta constante llamada dateFormat que va a ser igual a moment, 
    que moment es la librería que nosotros importamos,
    que recibe como parámetro la fecha que nosotros queremos darle formato, que en este caso es la que eligió el usuario (date). 
    Y después con .format le vamos a decir cuál es el formato con el cual nosotros queremos guardar("DD,MM,YYYY").*/
    const dateFormat = moment(date).format("DD/MM/YYYY");


    /* Estos console log ya no los necesitamos eran solo para verificar lo que habia aentro de TaskList y dateFormat o lo que nos devolvía.
    console.log(taskList);
    console.log(dateFormat);*/

    //Pondremos este if para evitar que se creen tareas vacías y sin fecha.
    // Si value es igual a un string vacio o date es un string vacío.
    //Entonces retorna a donde estabas y  no crees la tarea
    if(value === "" || date === "" ) {
      //Si alguna de estas 2 condiciones se cumple entonces retorna y ya no sigas ejecutando las demás lineas de codigo para crear una tarea.
      //Este console log solo era para ver que si hacemos click en agregar con todo vacío el no crea la tarea por el  return.  
      //console.log("retorna y no leas más codigo para crear la tarea");
        return;
    }


    //Con esto hacemos que el input quedé limpio y vacío luego que agregamos una tarea.
    //El valor del input es igual a un string vacío.
    input.value = "";
    //Con esto hacemos que la fecha del calendario quedé vacía y limpia luego que seleccionamos una fecha.
    calendar.value = "";

    //Esto nos ayudará  a marcar si la tarea fue completada o no.
    //La pondremos en false porque al crearla no podemos marcarla defrente si no la completamos.
    const complete = false;

      //Vamos a crear un objeto con una constante
      //Los valores que queremos almacenar del usuario son el valor de cual es la tarea, la fecha en la que realizará, y si fue completada la tarea.
      const taskObj = {
        // Ponemos una sola vez el nombre de la constante o de la variable que nosotros queremos almacenar en este objeto, 
          //Para  el nombre de la tarea.
          value, 
          //Para la fecha
          dateFormat,
          //Al inicio esta llave complete siempre es falso porque cada vez que agregamos una nueva tarea, no está completada.
          complete,
          //Agregaremos a cada uno de nuestros elementos un identificador que nos ayudará a saber :
          //cuál es el elemento que tenemos que marcar como completado, como no completado, o bien eliminar.s
          id: uuid.v4()
        };

      /*1. Por cada una de las tareas que se están agregando, o sea cada vez que nosotros estamos dando clic en el botón agregar, 
      lo que va a hacer es inicializar o decir que su estructura es cero, es simplemente un string vacío. */
      list.innerHTML = " ";


      /*Aquí almacenaremos nuestra lista de tareas en este array. */
      //Con getItem podremos obtener la información del localStorage pero nos devolverá en formato JSON.
      //Con JSON.parse toma un objeto que está en formato string y lo regresa a un objeto con format JavaScript.
      //En caso de que este objeto venga vacío como la primera vez que cargas la página,
      // le decimos con || pues simplemente definelo como un arreglo vacíó [].
      //Entonces taskList es igual a lo que tenga almacenado localStorage con la llave Tasks.
      const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
            //A nuestro taskList, le vamos a agregar nuestro taskObject, que es la última tarea que estamos nosotros registrando.
            //Con esto le pasamos directo los valores de value, dateFormat y complete que son los que tenemos en el taskObj.
            taskList.push(taskObj);

      //Ahora volveremos a almacenar nuestroa arreglo de tareas ya actualizado.          
      //Con LocalStorage guardamos cierta información y podemos hacer que sea persistente así cerremos la pestaña del navegador.
      //El primer método de este objeto se llama setItem(), que recibe dos parámetros.
      // El primer parámetro es la llave y el segundo es el valor o clave valor, justamente como lo dice la documentación de Mozilla
      //Ambos parámetros tienen que estar en formato string.
      //Json.stringify convierte un objeto a formato string.
      localStorage.setItem("tasks", JSON.stringify(taskList));
      
      //Vamos a llamar nuestra función de readTasks.
      //2. displayTasks se va a encargar de ir agregando cada una de las tareas,
      displayTasks();

      //Con esto haremos el llamado a la función (Ahora reemplazamos por la línea 86).
      //Crearemos una tarea que recibirá el objeto que estamos generando en taskObj.
      //const task = createTask(taskObj);
      //Agregamos la tarea a nuestra lista que estamos seleccionando con data atribute.
      /*En la lista agrégame el elemento task".*/
      //list.appendChild(task);

  };
  
  //CreateTask se va a encargar de generar toda la estructura HTML, agregar clases, y todo cuando le damos click en agregar.
  //inyectarle cuál va a ser el contenido de cada uno de los elementos y al final de cuenta nos va a regresar la tarea.//
  //Hacemos la desestructuración del objeto entre llaves indicando que queremos sustraer los valores de value, dateFormat, complete y id.
  //Exportaremos la función createTask para usarla con la de readTasks y así luego de leer las tareas almacenadas nos cree las cards de esas tareas.
  export const createTask = ({value, dateFormat, complete, id}) => {
      //vamos entonces a generar es un elemento de tipo li. 
      const task = document.createElement('li');
      //Después le vamos a agregar una clase llamada card.
            task.classList.add("card");
  
      //Backticks
      //Aqui generamos un elemento de tipo div
      const taskContent = document.createElement("div");
      
      //Hace la llamada de la función checkComplete, se le manda el id que es el identificador unico de cada tarea.
      const check = checkComplete(id);

      //Necesitamos ver si la tarea se completó para marcarla en azul el checklist.
      if (complete){
        //En caso de que complete sea true, lo que vamos a hacer es agregar estas clases CSS para cambiarlo a azul.
        //Usaremos la funcion toggle que si existe la clase la quita y si no la pone asi podemos seleccionar y desseleccionar el check.
        check.classList.toggle("fas");
        check.classList.toggle("completeIcon");
        check.classList.toggle("far");
      };

      //Aqui vamos a generar un elemento de tipo span.
      const titleTask = document.createElement("span");
           //A nuestro elemento span, que ya creamos, le estamos agregando nuestra tarea task.
            titleTask.classList.add("task");
            //Aqui decimos agregale el valor o el texto que escribió el usuario. 
            titleTask.innerText = value;
            //Agregamos los hijos:
            //Agrega primero el icono de checklist con su funcion.
            taskContent.appendChild(check);
            //Luego agrega el titulo de la tarea.
            taskContent.appendChild(titleTask);
     
            //task.innerHTML = content; 
            //inner.html es para agregar contenido
  
            //Asignamos sus hijos:
            task.appendChild(taskContent);
            //Mandamos a llamar a nuestra función deleteIcon que nos eliminará la tarea y le mandamos el identificador de cada tarea.
            task.appendChild(deleteIcon(id));
          
      //Ponemos esto para que nos retorne todo lo que se está creando
      //O sea que nos retorne la tarea.
      return task;
  }; 