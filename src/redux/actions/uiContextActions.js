

//  we are using this actions to set modal, and toast messages...

import { SHOW_MODAL, CLOSE_MODAL, GET_OFFER_DETAILS} from './types';

export const showModal = (component, params) => (dispatch,getState) => {


    dispatch({
        type: SHOW_MODAL,
        component:component,
        params:params
     })
}
export const closeModal = () => (dispatch) => {

    dispatch({type: CLOSE_MODAL,})

     // clear all modal sub components...
     dispatch({
        type: GET_OFFER_DETAILS,
        offerDetails: null
      })
}
