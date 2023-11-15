class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 37.785164,
      longitude: -100
    };
  }

  onMarkerDragStart = (event) => {
    const {latitude, longitude} = event;
    // Any functionality for when a drag starts
  }

  onMarkerDragEnd = (event) => {
    const {latitude, longitude} = event;
    // Any functionality for when a drag ends
    this.setState({latitude, longitude});
  }

  onMarkerDrag = (event) => {
    const {latitude, longitude} = event;
    // Any functionality when marker moves while being dragged
  }

  render() {
    return (
      <ReactMapGL
        latitude={this.state.latitude}
        longitude={this.state.longitude}
        width={500}
        height={500}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN} >
        <DraggableMarker
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          onDragStart={this.onMarkerDragStart}
          onDragEnd={this.onMarkerDragEnd}
          onDrag={this.onMarkerDrag} >
          <PinIcon />
        </DraggableMarker>
      </ReactMapGL>
    );
  }
}