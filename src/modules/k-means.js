import { random } from 'lodash';

const initialState = {
    points: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GENERATE_POINTS':
            return {
                ...state,
                points: [
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],

                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],

                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)],
                    [random(0, 400), random(0, 400)]
                ]
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
