const inquirer = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [{
            value: '1',
            name: `${'1.'.green} Crear tarea`
        },
        {
            value: '2',
            name: `${'2.'.green} Listar tareas`
        },
        {
            value: '3',
            name: `${'3.'.green} Listar tareas Completadas`
        },
        {
            value: '4',
            name: `${'4.'.green} Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${'5.'.green} Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6.'.green} Borrar tarea`
        },
        {
            value: '0',
            name: `${'0.'.green} Salir`
        }
    ]
}];

const preguntasPausa = [{
    type: 'input',
    name: 'opcion',
    message: `\n Preciones ${ 'ENTER'.green } para continuar `
}]

const inquirerMenu = async() => {

    console.clear();
    console.log('============================'.green);
    console.log('  Seleccione una opción'.white);
    console.log('============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {

    return inquirer.prompt(preguntasPausa);
}

const leerInput = async(message) => {
    const questions = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) return 'Por favor ingrese la descripcion'

            return true;
        }

    }];

    const { desc } = await inquirer.prompt(questions);
    return desc;
}

const listadoTareasBorrar = async(tareas = []) => {

    // {
    //     value: '2',
    //     name: `${'2.'.green} Listar tareas`
    // }

    const choices = tareas.map((tarea, i) => {

        //Convierte las tareas al formato de choises, recorriendo
        //El arreglo con .map

        const idx = `${i + 1}. `.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar '
    });

    //Se envian las preguntas al inquierer
    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }];


    const { id } = await inquirer.prompt(preguntas);
    //Retornamos el id luego de que el ususario seleccione la tarea que quiere
    //borrar
    return id;

}

const confirmar = async(message) => {

    const preguntas = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt(preguntas);
    return ok;

}

const mostraListadoCheckList = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}. `.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });


    const preguntas = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }];

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostraListadoCheckList
}