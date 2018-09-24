const urlString = "https://open.propellerhealth.com/prod";

const getForecasts = _.debounce(function(bounds) {
    const url = new URL(`${urlString}/forecasts`);
    url.searchParams.append('maxLatitude', bounds.f.f); //north
    url.searchParams.append('minLatitude', bounds.f.b); //south
    url.searchParams.append('maxLongitude', bounds.b.f); //east
    url.searchParams.append('minLongitude', bounds.b.b); //west
    return fetch(url).then(resp => resp.json());
}, 500, {leading: true});

const getForecast = function(postalCode) {
    const url = new URL(`${urlString}/forecast`);
    url.searchParams.append('postalCode', postalCode);
    return fetch(url).then(resp => resp.json());
}

export default {
    getForecasts,
    getForecast
}