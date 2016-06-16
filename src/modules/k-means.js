import { random, fill } from "lodash";

const initialState = {
    points: [],
    means: [],
    scale: 400
};

function generatePoint(scale) {
    return [random(0, scale), random(0, scale)];
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