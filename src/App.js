import './App.css';
import HomePage from './components/home/HomePage';
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
    <div className="App" className="homecontainer">
        <HomePage/>
    </div>
    </Provider>
  );
}

export default App;
