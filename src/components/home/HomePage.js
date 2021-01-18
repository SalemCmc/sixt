import React from 'react';
import OffersList from '../offers/OffersList';
import SearchPage  from '../search/SearchPage';
import ModalWindow  from '../common/ModalWindow';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// This is main component
const HomePage = () => {

  return(
       
       <React.Fragment>
            <ToastContainer/>
            <ModalWindow/>            
            <SearchPage/>
            <OffersList/>
        </React.Fragment>
    );
}

export default HomePage;