import './css/App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Tester from './components/InterfataTester';
import User from './components/InterfataUser';
import BugTester from './components/BugTester';
import BugUser from './components/BugUser';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/tester" exact component={Tester} />
            <Route path="/user" exact component={User} />
            <Route path="/bugtester" exact component={BugTester} />
            <Route path="/buguser" exact component={BugUser} />
            <Route path="/" render={() => <div>404</div>} />
          </Switch>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
