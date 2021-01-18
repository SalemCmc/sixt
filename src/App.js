import './App.css';
import HomePage from './components/home/HomePage';
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
    <div className="App" style={{backgroundColor: 'gray', minHeight: "100%"}}>
        <HomePage/>
    </div>
    </Provider>
  );
}

export default App;
