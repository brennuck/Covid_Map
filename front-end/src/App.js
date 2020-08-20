import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Map from "./Components/Map.js";
import { coordinates } from "./Patch/CountryCordinates.js";

class App extends Component {
	constructor() {
		super();
		this.state = {
			countries_data: [],
			fields: ["confirmed", "deaths", "recovered"],
			query: "confirmed",
		};
	}

	componentDidMount() {
		this.fetchCountryData();
	}

	fetchCountryData = async () => {
		axios
			.get("https://corona-api.com/countries")
			.then((res) => {
                const countries_data = this.processData(res.data.data);
				this.setState({ countries_data });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	processData = (data) => {
		let processed = [];

		for (const d of data) {
			let obj = {
				name: d.name,
				code: d.code,
				flag: `https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/${d.code.toLowerCase()}.svg`,
				updated_at: d.updated_at,
				confirmed: d.latest_data.confirmed,
				deaths: d.latest_data.deaths,
				recovered: d.latest_data.recovered,
			};

			// Patch for countries' coordinates
			obj["coordinates"] = {
				latitude:
					coordinates.find((f) => f.country_code === d.code) !==
					undefined
						? coordinates.find((f) => f.country_code === d.code)
								.latlng[0]
						: 0,
				longitude:
					coordinates.find((f) => f.country_code === d.code) !==
					undefined
						? coordinates.find((f) => f.country_code === d.code)
								.latlng[1]
						: 0,
			};

			processed.push(obj);
		}

		return processed;
	};

	handleSetQuery = (query) => {
		this.setState({
			query,
		});
	};

	render() {
		return (
			<div className="App">
				<Map />
			</div>
		);
	}
}

export default App;
