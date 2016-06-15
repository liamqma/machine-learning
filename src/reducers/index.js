import { combineReducers } from "redux";

const data = [
    [1, 2],
    [2, 1],
    [2, 4],
    [1, 3],
    [2, 2],
    [3, 1],
    [1, 1],

    [7, 3],
    [8, 2],
    [6, 4],
    [7, 4],
    [8, 1],
    [9, 2],

    [10, 8],
    [9, 10],
    [7, 8],
    [7, 9],
    [8, 11],
    [9, 9],
];

function points() {
    return data;
}

function extremes() {
    return getDataExtremes(data);
}

function getDataExtremes(points) {

    var extremes = [];

    for (var i in data) {
        var point = data[i];

        for (var dimension in point) {
            if (!extremes[dimension]) {
                extremes[dimension] = { min: 1000, max: 0 };
            }

            if (point[dimension] < extremes[dimension].min) {
                extremes[dimension].min = point[dimension];
            }

            if (point[dimension] > extremes[dimension].max) {
                extremes[dimension].max = point[dimension];
            }
        }
    }

    return extremes;

}

export default combineReducers({
    points,
    extremes
});