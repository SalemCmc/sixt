import { GET_INIT_OFFERS,GET_OFFERS,GET_OFFER_DETAILS, GENERATE_BODY_STYLE } from '../actions/types';

const initialState = {

  initOfferList: [],
  offerList: null,
  bodyStyles: {},
  offerDetails:null,

  filterParams:{
    bodyStyle:"",
    automaticOnly: false,
    numOfSeats:null
  },
};

export default function (state = initialState, action)
{
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