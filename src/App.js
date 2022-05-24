import React, { Component } from "react";
import "./App.css";
import Huile from './components/huile';
import Lait from './components/lait';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/huile" element={<Huile/>} />
            <Route path="/lait" element={<Lait/>} />
            
          </Routes>
          
        </Router>
      </div>
    );
  }
}

export default App;