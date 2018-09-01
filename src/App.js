
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sketch from './Sketch';
// import LC from 'literallycanvas';
// import 'react-addons';
import FabricSketchRectangle from './FabricSketchRectangle';
import FabricSketchPolygon from './FabricSketchPolygon';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <Sketch /> */}
        {/* <FabricSketchRectangle /> */}
        <FabricSketchPolygon />
        {/* <div>
          <LC.LiterallyCanvasReactComponent imageURLPrefix="/static/img" />
        </div> */}
      </div>
    );
  }
}

export default App;
