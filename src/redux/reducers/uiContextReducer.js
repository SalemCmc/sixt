

//  we are using this reducer to set modal, and toast messages
import { SHOW_MODAL, CLOSE_MODAL} from '../actions/types';

const initialState = {

    //modal content
    component: null,
    params: null,
};

export default function (state = initialState, action) {

    // console.log("REDUX action:",action);
       switch (action.type)
       {   
          case SHOW_MODAL:
            return {...state,component: action.component,params: action.params};
          case CLOSE_MODAL: return initialState;
           
   
         default:
           return state;
       }
     }