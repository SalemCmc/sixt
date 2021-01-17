import { GET_INIT_OFFERS,GET_OFFERS,GET_OFFER_DETAILS, GENERATE_BODY_STYLE } from '../actions/types';

const initialState = {

  initOfferList: [],
  //offerList: [],
  offerList: null,
  bodyStyles: {},
  offerDetails:null,

  filterParams:{
    bodyStyle:"",
    automaticOnly: false,
    numOfSeats:null
  },


  //loading: false,
  //shoppingCartList: [],
  //totalPrice: 0,
  //succesPost: false,
  //errors: { errorStatus: false, errorMessage: "" },
};

export default function (state = initialState, action) {

 // console.log("REDUX action:",action);
    switch (action.type)
    {   
      case GET_INIT_OFFERS:
        return {
          ...state,
          initOfferList: action.offers,
          offerList: action.offers
        };
      case GET_OFFERS:
        return {
          ...state,
          offerList: action.offers
        };
        case GENERATE_BODY_STYLE:
          return {
            ...state,
            bodyStyles: action.bodyStyles
          };
          
        case GET_OFFER_DETAILS:
        return {
          ...state,
          offerDetails: action.offerDetails
        };    

      default:
        return state;
    }
  }