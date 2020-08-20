import React from "react";
import ReactMapGL from "react-map-gl";

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            viewport: {
                width: "100%",
                height: 800 ,
                latitude: 0,
                longitude: 0,
                zoom: 2,
            }
        }
    }

    render() {
        return (
            <ReactMapGL
			{...this.state.viewport}
            onViewportChange={(nextViewport) => this.setState({ nextViewport })}
            mapboxApiAccessToken={"pk.eyJ1IjoiYnJlbm51Y2siLCJhIjoiY2tlMXlkZWozMDN6dzMxbHE5NHJlYzlkbCJ9.fBfI2mwJEhLuvIYxIf3Nvg"}
		/>
        )
    }
}

export default Map;
