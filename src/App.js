import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/header';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <div className="container">
          <Switch>
            <Route path='/login'>
              <Login/>
            </Route>
            <Route path='/register'>
              <Register/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
