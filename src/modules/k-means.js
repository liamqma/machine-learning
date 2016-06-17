import { random, fill } from "lodash";

const initialState = {
    points: [],
    means: [],
    assignments: [],
    scale: 400
};

function generatePoint(scale) {
    return [random(0, scale), random(0, scale)];
}

function getAssignments(points, means) {

    const assignments = [];

    for (var i in points) {
        var point = points[i];
        var distances = [];

        for (var j in means) {
            var mean = means[j];
            var sum = 0;

            for (var dimension in point) {
                var difference = point[dimension] - mean[dimension];
                difference *= difference;
                sum += difference;
            }

            distances[j] = Math.sqrt(sum);
        }

        assignments[i] = distances.indexOf(Math.min.apply(null, distances));
    }

    return assignments;
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GENERATE_POINTS': {
            return {
                ...state,
                points: fill(Array(50), 0).map(generatePoint.bind(null, state.scale))
            };
        }
        case 'GENERATE_MEANS':
            return {
                ...state,
                means: fill(Array(3), 0).map(generatePoint.bind(null, state.scale))
            };
        case 'MAKE_ASSIGNMENTS':
            return {
                ...state,
                assignments: getAssignments(state.points, state.means)
            };
        default:
            return state;
    }
}

export function generatePoints() {
    return {
        type: 'GENERATE_POINTS'
    }
}
export function generateMeans() {
    return {
        type: 'GENERATE_MEANS'
    }
}
export function makeAssignments() {
    return {
        type: 'MAKE_ASSIGNMENTS'
    }
}