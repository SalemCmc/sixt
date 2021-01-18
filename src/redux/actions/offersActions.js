
import { GET_INIT_OFFERS,GET_OFFERS,GET_OFFER_DETAILS, GENERATE_BODY_STYLE, CLOSE_MODAL } from './types';
import {  toast } from 'react-toastify';
import {mockOfferList} from '../../helpers/mockData';



export const getOffers = () => dispatch => {  

    fetch('https://cdn.sixt.io/codingtask/offers.json')
        .then(response => response.json())
        .then(data =>
        {
			dispatch(generateBodyStyle(data.offers));
            dispatch({
			type: GET_INIT_OFFERS,
            offers: data.offers
		    })
        }
		)
		.catch(error => {  
			toast.error("Fetch data error: "+error.message);
			toast.warn("Using mock data!",{"autoClose": false});
			let mockOffers=mockOfferList().offers;
			dispatch(generateBodyStyle(mockOffers));
			dispatch({type: GET_INIT_OFFERS,offers: mockOffers})
		});
}

export const filterOffers = (params) => (dispatch,getState) => {

	let filteredOffers=getState().offers.initOfferList.slice(0);

	const result = filteredOffers.filter(item =>
		(
			((params["onlyAutomatic"]&& item.carGroupInfo.automatic===true)) || !params["onlyAutomatic"])
			&&
			((params["numOfSeats"]&& item.carGroupInfo.maxPassengers===Number(params["numOfSeats"])) || !params["numOfSeats"])
			&&
			((params["priceUpTo"]&& item.prices.dayPrice.amount.value<=Number(params["priceUpTo"])) || !params["priceUpTo"])
			&&
			((params["carTypes"].length>0 && params["carTypes"].indexOf(item.carGroupInfo.bodyStyleKey) !==-1   ) 
			|| params["carTypes"].length===0)
			
		);

	dispatch({type: GET_OFFERS,offers: result}) 
}

export const getOfferDetails = (id) => (dispatch,getState) => {

	//console.log("FILTER ACTION PARAMS:",id)
	let offersList=getState().offers.initOfferList.slice(0);
	let selectedItem=offersList.find((item)=>item.id===id);

	dispatch({
	   type: GET_OFFER_DETAILS,
	   offerDetails: selectedItem
	 })
}
export const generateBodyStyle =(items)=> dispatch =>
{
	let bodyStyles={};
	items.forEach( item=>
	{
		let style=item.carGroupInfo.bodyStyleKey;
		if(!bodyStyles[style])
		{
			bodyStyles[style]=true;
		}
	})

	dispatch({type: GENERATE_BODY_STYLE,bodyStyles: bodyStyles})  
}

export const bookOffer = (newOffer) => (dispatch) => {

	// 1. send new offer to backEnd
	// 2. after 202 response show toast message about succes booking
	// 3. close && clean modal

	//simulation of api waiting...
	setTimeout(()=>{ 
		toast.success("You have successfully booked the offer!",{"autoClose": 10000});
		dispatch({type: CLOSE_MODAL})
	}, 3000);
}