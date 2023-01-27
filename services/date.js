//Exportamos nuestra arrow function para usarla fuera.
//Esta función será para solo tener fechás únicas del dateElement.
//Es decir que no se repitan por cada card y todo este en un bloque.
//Nuestro parámetro tasks será nuestra lista de tareas.
export const uniqueDates = (tasks) => {
    //Veremos la lista de tareas con esto para comprobar.
  //  console.log(tasks);
  
   //Con estto crearemos un nuevo arreglo limpio con fechas que no se repitan. 
   const unique = [];
   //La lista que recibimos de tasks es un arreglo entonces vamos a recorrerlo.
   //Ponemos como parámetro task que es cada tarea.
   tasks.forEach(task => {
        //Le pediremos que nos imprima cada una de las fechas que tiene cada tarea para comprobar.
        //console.log(task.dateFormat);

        /*Si en nuestro arreglo unique no existe aun la fecha de la tarea
        if(!unique.includes(task.dateFormat)) {
            //Entonces agregalo. 
            unique.push(task.dateFormat);
        };*/

        //Ponndremos este if de arriba en una sola línea
        if(!unique.includes(task.dateFormat)) unique.push(task.dateFormat);
   });

    //Imprmimos nuestro arreglo de unique para comprobar.
    //console.log(unique);

    //Retornamos nuestro arreglo
    return unique;
};

//Necesitamos ordenar correctamente nuestra lista unica de fechas antes de enviarlas
//Por eso nuestra arrow funcion como parámetro va a recibir un arreglo de fechas.
export const orderDates = ( dates ) => {
        //Con .sort ordenaremos el arreglo.
        return dates.sort((a,b) => {
            //Necesitamos convertir las fechas a formato moment para hacer la comparación.
            //Comenzamos con el primer parámetro que será a y luego el formato de la fecha.
            const firstDate = moment(a,"DD/MM/YYYY");
            //Vamos con el segundo parámetro que será b y luego el formato de la fecha.
            const secondDate = moment(b, "DD/MM/YYYY");
            //Y ahora vamos a retornar el ordenamiento de nuestra lista.
            return firstDate - secondDate;
          });
};

