import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Map from './Components/Map.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            countries_data: []
        }
    }
    
	componentDidMount() {
		this.fetchCountryData();
    }
    
	fetchCountryData = async () => {
        axios.get("https://corona-api.com/countries")
        .then(res => {
            this.setState({ countries_data: res.data.data })
        })
        .catch(err => {
            console.log(err);
        })
    };

	render() {
        return (
            <div className="App">
                <Map />
            </div>
        )
	}
}

export default App;
