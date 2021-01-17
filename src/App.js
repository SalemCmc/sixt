//import logo from './logo.svg';
import './App.css';

//import Offer_list from './components/Offer_list';
//import Search from './components/search1';
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
