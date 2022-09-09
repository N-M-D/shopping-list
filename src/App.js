import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/header';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Families from './pages/families';
import Products from './pages/products';
import ShoppingList from './pages/shoppingList';
import User from './pages/user';
import Family from './pages/family';

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
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route path='/families'>
              <Families/>
            </Route>
            <Route path='/products'>
              <Products/>
            </Route>
            <Route path='/shoppingList'>
              <ShoppingList/>
            </Route>
            <Route path='/user'>
              <User/>
            </Route>
            <Route path='/family/:id'>
              <Family/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
