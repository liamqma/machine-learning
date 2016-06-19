import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as actions from "../modules/k-means";
import { connect } from "react-redux";

const scale = 400;

class App extends Component {
    start() {
        this.props.generatePoints();
        this.props.generateMeans();
        this.props.moveMeans();
    }
    componentDidUpdate(prevProps) {
        if (this.props.moved) {
            this.props.moveMeans();
        }
    }
    render() {
        return (
            <div>
                <h2>k-Means</h2>
                <button onClick={this.start.bind(this)}>Run</button>
                <ul>
                    <li>Plot your data points</li>
                    <li>Create "k" additional points, placing them randomly on your graph. These points are the "cluster
                        centroids" -- or the candidates for the centers of your clusters
                    </li>
                    <li>Repeat the following:
                        <ol>
                            <li>"Assign" each data point to the cluster centroid closest to it</li>
                            <li>Move the centroid to the average position of all the data points that belong to it</li>
                            <li>If any of the centroids moved in the last step, repeat. If nothing moved, exit.</li>
                        </ol>
                    </li>
                </ul>
                <div style={{ width: `${scale}px`, height: `${scale}px` }} className="app">
                     {this.props.points.map((point, index) =>
                         <span key={index} data-x={point[0]} data-y={point[1]} data-type={this.props.assignments[index]}
                               className="point"
                               style={{ left: `${point[0]}px`, bottom: `${point[1]}px` }}></span>
                     )}
                     {this.props.means.map((point, index) =>
                         <span key={index} data-x={point[0]} data-y={point[1]} data-type={index}
                               className="point point--mean"
                               style={{ left: `${point[0]}px`, bottom: `${point[1]}px` }}></span>
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
