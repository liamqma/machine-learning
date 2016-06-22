import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as actions from "../modules/k-means";
import { connect } from "react-redux";
import classnames from "classnames";

const DELAY_BETWEEN_STEPS = 1000;

class App extends Component {
    start() {
        this.props.generatePoints();
        setTimeout(this.props.generateMeans, DELAY_BETWEEN_STEPS);
        setTimeout(this.props.moveMeans, DELAY_BETWEEN_STEPS * 2);
    }

    componentDidUpdate(prevProps) {
        if (this.props.moved) {
            setTimeout(this.props.moveMeans, DELAY_BETWEEN_STEPS);
        }
    }

    render() {
        return (
            <div className="k-means">
                <h2><a href="http://burakkanber.com/blog/machine-learning-k-means-clustering-in-javascript-part-1/" target="_blank">k-Means</a>
                </h2>
                <button onClick={this.start.bind(this)}>Run</button>
                <ul>
                    <li className={classnames({ done: this.props.step > 0 })}>Plot your data points</li>
                    <li className={classnames({ done: this.props.step > 1 })}>Create "k" additional points, placing them
                        randomly on your graph. These points are the "cluster
                        centroids" -- or the candidates for the centers of your clusters
                    </li>
                    <li className={classnames({ done: this.props.step > 2 })}>Repeat the following:
                        <ol>
                            <li>"Assign" each data point to the cluster centroid closest to it</li>
                            <li>Move the centroid to the average position of all the data points that belong to it</li>
                            <li>If any of the centroids moved in the last step, repeat. If nothing moved, exit.</li>
                        </ol>
                    </li>
                </ul>
                <div style={{ width: `${this.props.scale}px`, height: `${this.props.scale}px` }} className="app">
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
