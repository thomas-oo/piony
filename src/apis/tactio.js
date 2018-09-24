const urlString = "https://virtserver.swaggerhub.com/TactioHealth/piony/1.0.2";

const getPatients = function () {
    const url = new URL(`${urlString}/patients`);
    return fetch(url).then(resp => resp.json());
}

const editPatient = function (patient) {
    const url = new URL(`${urlString}/patients/${patient.id}`);
    return fetch(url, {method: 'PUT', body: JSON.stringify(patient)}).then(resp => resp.ok ? Promise.resolve() : Promise.reject());
}

const addPatient = function (patient) {
    const url = new URL(`${urlString}/patients`);
    return fetch(url, {method: 'POST', body: JSON.stringify(patient)}).then(resp => resp.json());
}

export default {
    getPatients,
    editPatient,
    addPatient
}