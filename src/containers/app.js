import React, { Component } from "react";
import { connect } from 'react-redux';

const scale = 400;

class App extends Component {
    render() {

        const [xExtreme, yExtreme] = this.props.extremes;

        return (
            <div style={{width: `${scale}px`, height: `${scale}px`}} className="app">
                {this.props.points.map((point, index) =>
                    <span key={index} data-x={point[0]} data-y={point[1]} className="point" style={{left: `${scale / (xExtreme.max + 1) * point[0]}px`, bottom: `${scale / (yExtreme.max + 1) * point[1]}px`}}></span>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(App);
