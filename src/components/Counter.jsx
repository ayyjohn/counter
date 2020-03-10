import React, { Component } from "react";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }

    handleButtonPush = (e) => {
        e.preventDefault();
        this.postCount();
    }

    componentDidMount = () => {
        this.getCount();
    }

    getCount = () => {
        fetch('/count')
            .then(res => res.json())
            .then((res) => this.setState({count: res.count}))
    }

    postCount = () => {
        fetch('/count', {method: "POST"})
            .then(res => res.json())
            .then((res) => this.setState({count: res.count}))
    }

    render() {
        return (
            <div>
                <h1>count: {this.state.count}</h1>
                <button onClick={this.handleButtonPush}>push</button>
            </div>

        )
    }
}

export default Counter