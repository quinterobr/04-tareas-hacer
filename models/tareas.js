const Tarea = require("./tarea");



class Tareas {
    _listado = {};

    get listarArray() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) delete this._listado[id];
    }

    cargarTareas(tareas = []) {

        // Object.keys(tareas).forEach(key => {
        //     this._listado[key] = tareas[key];
        // })
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        let listaTareas = '\n';

        this.listarArray.forEach((tarea, ind) => {

            const i = `${ind + 1}`.green;

            if (!tarea.completadoEn) {
                listaTareas += `${i}. ${tarea.desc} :: ${'Pendiente'.red} \n`
            } else {
                listaTareas += `${i}. ${tarea.desc} :: ${'Completada'.green} \n`
            }

        })

        console.log(listaTareas);
    }

    listarTareas(estadoTarea = true) {

        let listaTareas = '\n';
        let cont = 1;

        this.listarArray.forEach(tarea => {

            if (estadoTarea) {
                if (tarea.completadoEn) {
                    listaTareas += `${cont.toString().green}. ${tarea.desc} ${'::'.green} ${tarea.completadoEn}\n`
                    cont++;
                }
            } else {
                if (!tarea.completadoEn) {
                    listaTareas += `${cont.toString().red}. ${tarea.desc} ${'::'.red} ${tarea.completadoEn}\n`;
                    cont++;
                }
            }
        })
        console.log(listaTareas);

    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn) tarea.completadoEn = new Date().toISOString();

        });

        this.listarArray.forEach(tarea => {

            if (!ids.includes(tarea.id)) this._listado[tarea.id].completadoEn = null;

        });
    }


}

module.exports = Tareas;