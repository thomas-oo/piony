const urlString = "https://virtserver.swaggerhub.com/TactioHealth/piony/1.0.2";

const getPatients = function () {
    const url = new URL(`${urlString}/patients`);
    return fetch(url).then(resp => resp.json());
}

export default {
    getPatients
}