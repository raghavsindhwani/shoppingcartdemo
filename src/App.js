import React from 'react';
import Login from './components/Login';
import ShowPage from './containers/ShowPage';
import { Route, BrowserRouter } from 'react-router-dom';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/product" component={ShowPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;