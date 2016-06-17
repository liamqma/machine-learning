import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import * as actions from '../modules/k-means';
import { connect } from 'react-redux';

const scale = 400;

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.generatePoints}>Generate Points</button>
                <button onClick={this.props.generateMeans}>Generate K Means</button>
                <button onClick={this.props.makeAssignments}>MAKE Assignments</button>
                <div style={{width: `${scale}px`, height: `${scale}px`}} className="app">
                     {this.props.points.map((point, index) =>
                         <span key={index} data-x={point[0]} data-y={point[1]} className="point"
                               style={{left: `${point[0]}px`, bottom: `${point[1]}px`}}></span>
                     )}
                     {this.props.means.map((point, index) =>
                         <span key={index} data-x={point[0]} data-y={point[1]} className="point point--mean"
                               style={{left: `${point[0]}px`, bottom: `${point[1]}px`}}></span>
                     )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.kMeans;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
