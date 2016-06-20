import { random, fill } from "lodash";

const initialState = {
    points: [],
    means: [],
    assignments: [],
    scale: 400,
    moved: false,
    step: 0
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

function calcMeans(means, assignments, points, scale) {

    var sums = new Array(means.length);
    var counts = new Array(means.length);
    var moved = false;

    for (var j in means) {
        counts[j] = 0;
        sums[j] = new Array(means[j].length);
        for (var dimension in means[j]) {
            sums[j][dimension] = 0;
        }
    }

    for (var point_index in assignments) {
        var mean_index = assignments[point_index];
        var point = points[point_index];
        var mean = means[mean_index];

        counts[mean_index]++;

        for (var dimension in mean) {
            sums[mean_index][dimension] += point[dimension];
        }
    }

    for (var mean_index in sums) {
        console.log(counts[mean_index]);
        if (0 === counts[mean_index]) {
            sums[mean_index] = means[mean_index];
            console.log("Mean with no points");
            console.log(sums[mean_index]);

            sums[mean_index] = generatePoint(scale);
            continue;
        }

        for (var dimension in sums[mean_index]) {
            sums[mean_index][dimension] /= counts[mean_index];
        }
    }

    if (means.toString() !== sums.toString()) {
        moved = true;
    }

    return { means: sums, moved };
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GENERATE_POINTS': {
            return {
                ...state,
                step: 1,
                points: [
                    [random(0, state.scale / 2), random(0, state.scale / 2)],
                    [random(0, state.scale / 2), random(0, state.scale / 2)],
                    [random(0, state.scale / 2), random(0, state.scale / 2)],
                    [random(0, state.scale / 2), random(0, state.scale / 2)],
                    [random(0, state.scale / 2), random(0, state.scale / 2)],
                    [random(0, state.scale / 2), random(0, state.scale / 2)],
                    [random(0, state.scale / 2), random(0, state.scale / 2)],

                    [random(state.scale / 2, state.scale), random(0, state.scale / 2)],
                    [random(state.scale / 2, state.scale), random(0, state.scale / 2)],
                    [random(state.scale / 2, state.scale), random(0, state.scale / 2)],
                    [random(state.scale / 2, state.scale), random(0, state.scale / 2)],
                    [random(state.scale / 2, state.scale), random(0, state.scale / 2)],
                    [random(state.scale / 2, state.scale), random(0, state.scale / 2)],

                    [random(state.scale / 2, state.scale), random(state.scale / 2, state.scale)],
                    [random(state.scale / 2, state.scale), random(state.scale / 2, state.scale)],
                    [random(state.scale / 2, state.scale), random(state.scale / 2, state.scale)],
                    [random(state.scale / 2, state.scale), random(state.scale / 2, state.scale)],
                    [random(state.scale / 2, state.scale), random(state.scale / 2, state.scale)],
                    [random(state.scale / 2, state.scale), random(state.scale / 2, state.scale)],
                ]
            };
        }
        case 'GENERATE_MEANS':
            return {
                ...state,
                step: 2,
                means: fill(new Array(3), 0).map(generatePoint.bind(null, state.scale))
            };
        case 'MOVE_MEANS':

            const assignments = getAssignments(state.points, state.means);
            const { means, moved } = calcMeans(state.means, assignments, state.points, state.scale);

            return {
                ...state,
                step: 3,
                assignments,
                means,
                moved
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
export function moveMeans() {
    return {
        type: 'MOVE_MEANS'
    }
}