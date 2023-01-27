//Importamos nuestra constante addTask para poder usar la función que vive dentro de ella.
import { addTask } from "./components/addTask.js";
//Importaremos nuestra función de readTasks aquí porque queremos que se ejecute cuando cargue o se actualize la página.
import { displayTasks } from "./components/readTasks.js";

//Tenemos a btn
/*Aquí estamos seleccionando el botón de agregar*/
const btn = document.querySelector("[data-form-btn]");

//Nuestro listener
// Será cuando el usuario haga click

//La acción 
//Será que al hacer click el usuario le aparecerá en la consola "crear tarea".

//AddEventListener tiene 2 parámetros
// 1 . ¿Cuál es el elemento a escuchar?
//2. Después que es lo que quieren que hagas

//Arrow functions o funciones anónimas:
/*Cuando le dé clic en el botón agregar el llama a la función y debe agregar la tarea.*/
btn.addEventListener('click', addTask);

//Mandamos llamar nuestra función readTasks para que nos lea la info guardada en localStorage cuando  cargue o se actualize la página.
displayTasks();