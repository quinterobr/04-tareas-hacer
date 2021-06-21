require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostraListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB(); //Me regresa la data con las tareas del archivo

    if (tareasDB) {
        tareas.cargarTareas(tareasDB);
        console.log(tareas._listado);
    }

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarTareas(true);
                break;

            case '4':
                tareas.listarTareas(false);
                break;

            case '5':
                const ids = await mostraListadoCheckList(tareas.listarArray);
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                //Funcion para mostrar las tareas en forma de menu y atrapar el id
                //Regresa el id de la tarea que se desea borrar
                const id = await listadoTareasBorrar(tareas.listarArray);
                if (id !== '0') {

                    const ok = await confirmar('¿Está seguro?');
                    if (ok) tareas.borrarTarea(id);
                }

                break;

        }

        guardarDB(tareas.listarArray);
        await pausa();

    } while (opt !== '0')



}

main();