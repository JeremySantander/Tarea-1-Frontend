const robots = [];

const cargarRobots = ()=>{
    const tbody = document.querySelector("#robot-table");
    tbody.innerHTML = "";
    for (let i=0; i <robots.length; i++){
        let r = robots[i];
        let fila = document.createElement("tr");
        let celdaSerie = document.createElement("td");
        celdaSerie.innerText = r.serietxt;
        let celdaTipo = document.createElement("td");
        celdaTipo.innerText = r.tiposelect;
        let celdaObjetivo = document.createElement("td");
        celdaObjetivo.innerText = r.objetivotxt;
        let celdaFecha = document.createElement("td");
        celdaFecha.innerText = r.datenumber;
        let celdaPrioridad = document.createElement("td");
        celdaPrioridad.innerText = r.prioridad;
        fila.appendChild(celdaSerie);
        fila.appendChild(celdaTipo);
        fila.appendChild(celdaObjetivo);
        fila.appendChild(celdaFecha);
        fila.appendChild(celdaPrioridad);
        tbody.appendChild(fila);
    }
};

const buscarRobots = (serie) => {
    const tbody = document.querySelector("#robot-table");
    tbody.innerHTML = "";
    const filtro = serie.trim().toLowerCase();
    for (let i = 0; i < robots.length; i++) {
        let r = robots[i];
        if (filtro === "" || r.serietxt.toLowerCase().startsWith(filtro)) {
            let fila = document.createElement("tr");
            let celdaSerie = document.createElement("td");
            celdaSerie.innerText = r.serietxt;
            let celdaTipo = document.createElement("td");
            celdaTipo.innerText = r.tiposelect;
            let celdaObjetivo = document.createElement("td");
            celdaObjetivo.innerText = r.objetivotxt;
            let celdaFecha = document.createElement("td");
            celdaFecha.innerText = r.datenumber;
            let celdaPrioridad = document.createElement("td");
            celdaPrioridad.innerText = r.prioridad;
            fila.appendChild(celdaSerie);
            fila.appendChild(celdaTipo);
            fila.appendChild(celdaObjetivo);
            fila.appendChild(celdaFecha);
            fila.appendChild(celdaPrioridad);
            tbody.appendChild(fila);
        }
    }
};

const init = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
};

init();

const validarNombre = (elemento) => {
    elemento.classList.remove('is-invalid');
    const divPadre = elemento.parentElement;
    divPadre.querySelector('.invalid-feedback')?.remove();
    if (elemento.value.length <7) {
            elemento.classList.add('is-invalid');
            const feedback = document.createElement('div');
            feedback.innerText = `El numero de menor a 7 caracteres`;
            feedback.classList.add('invalid-feedback');
            divPadre.appendChild(feedback);
            return false;
        } 
    else {
        for (let i=0; i <robots.length;){
            if (elemento.value == robots[i].serietxt) {
                elemento.classList.add('is-invalid');
                const feedback = document.createElement('div');
                feedback.innerText = `${elemento.value} ya esta en tabla`;
                feedback.classList.add('invalid-feedback');
                divPadre.appendChild(feedback);
                return false;
            };
            i++;
        }
    }
    return true;
};

const validartipo = (elemento) => {
    // Limpieza del elemento
    elemento.classList.remove('is-invalid');
    const divPadre = elemento.parentElement;
    divPadre.querySelector('.invalid-feedback')?.remove();

    if (!elemento.value || elemento.value == "0") {
        elemento.classList.add('is-invalid');
        const feedback = document.createElement('div');
        feedback.innerText = `Selecione un tipo`;
        feedback.classList.add('invalid-feedback');
        divPadre.appendChild(feedback);
        return false;
    }
    return true;
};
const validarobjetivo = (elemento) => {
    // Limpieza del elemento
    elemento.classList.remove('is-invalid');
    const divPadre = elemento.parentElement;
    divPadre.querySelector('.invalid-feedback')?.remove();

    if (!elemento.value) {
        elemento.classList.add('is-invalid');
        const feedback = document.createElement('div');
        feedback.innerText = `Ingrese un objetivo`;
        feedback.classList.add('invalid-feedback');
        divPadre.appendChild(feedback);
        return false;
    }
    return true;
};
const validardate = (elemento) => {
    // Limpieza del elemento
    elemento.classList.remove('is-invalid');
    const divPadre = elemento.parentElement;
    divPadre.querySelector('.invalid-feedback')?.remove();

    if (!elemento.value || elemento.value > 3000 || elemento.value < 1997){
        elemento.classList.add('is-invalid');
        const feedback = document.createElement('div');
        feedback.innerText = `Ingrese un año entre 1997 y 3000`;
        feedback.classList.add('invalid-feedback');
        divPadre.appendChild(feedback);
        return false;
    }
    return true;
};
const calcularPrioridad = (elemento, nombre) => {
    elemento = elemento.value;
    if (nombre == "Sarah Connor"){
        return 999;
    }
    if (elemento == "T-1"){
        return 1;
    } if (elemento == "T-800"){
        return 100;
    } if (elemento == "T-1000"){
        return 200;
    } if (elemento == "T-3000"){
        return 500;
    } else {
        return null;
    }
};

document.querySelector('#buscar-txt').addEventListener('input', (e) => {
    const valor = e.target.value;
    if (valor.trim() === "") {
        cargarRobots();
    } else {
        buscarRobots(valor);
    }
});

document.querySelector('#registrar-btn').addEventListener('click', () => {
    let serietxt = document.querySelector('#serie-txt');
    let tiposelect = document.querySelector('#tipo-select');
    let objetivotxt = document.querySelector('#objetivo-txt');
    let datenumber = document.querySelector('#date-number');
    

    if (!validarNombre(serietxt) | !validartipo(tiposelect)| !validarobjetivo(objetivotxt) | !validardate(datenumber)) {
        return ;
    };

    let prioridad = calcularPrioridad(tiposelect, objetivotxt.value);

    let robot = {};

    robot.serietxt = serietxt.value;
    robot.tiposelect = tiposelect.value;
    robot.objetivotxt = objetivotxt.value;
    robot.datenumber = datenumber.value;
    robot.prioridad = prioridad;

    robots.push(robot);
    cargarRobots();
});

document.querySelector('#limpiar-btn').addEventListener('click', () => {
    document.querySelector('#serie-txt').value = "";
    document.querySelector('#tipo-select').value = "0";
    document.querySelector('#objetivo-txt').value = "";
    document.querySelector('#date-number').value = "";
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
});
