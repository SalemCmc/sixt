import React, { useEffect} from 'react';
import { Button, Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getOffers } from '../../redux/actions/offersActions';
import { showModal } from '../../redux/actions/uiContextActions';
import noPhotoCar from '../../helpers/noPhotoCar.jpg';

 const OffersList=(props) => {

  
  useEffect(() => { props.getOffers() }, []);

  const showofferDetails =(itemID)=>
  {
    props.showModal("OfferDetails",{itemID});
  }
  const bookOffer =(item)=>
  {
    let params={
       itemID: item.id,
       itemImage: (item.splashImages && item.splashImages[0] && item.splashImages[0].narrowMedium)
                 || (item.carGroupInfo && item.carGroupInfo.modelExample && item.carGroupInfo.modelExample.imageUrl || noPhotoCar)
      };

    props.showModal("OfferBook",params);
  }


  return (  
<Container >
{props.offersList==null ?<Spinner animation="border" variant="light"/>:null }


  <br/>  <span className="sr-only">Loading...</span>
  
  {props.offersList && props.offersList.length===0 ?<center><h3>Sorry, no results! </h3></center>: null}
  <Row>
  {props.offersList && props.offersList.length>0 && props.offersList.map((item ,index)=>

      <Col xs={12} md={6} lg={4} key={item.id}>
      <Card bg="dark" style={{ marginBottom: '10px' ,border:"0px"}}>
      <Card.Img onClick={()=>showofferDetails(item.id)} style={{ cursor:"pointer"}}
      variant="top" src={(item.carGroupInfo && item.carGroupInfo.modelExample && item.carGroupInfo.modelExample.imageUrl)|| noPhotoCar} />
      <Card.Body style={{ color: 'orange' }}>
      <Card.Title>{item.headlines.description}</Card.Title>
      <Card.Text>
      {item.prices.dayPrice.amount.display +' '+item.prices.dayPrice.amount.currency}
      </Card.Text>
      <Button variant="outline-warning" size="sm" block onClick={()=>bookOffer(item)}>Book</Button>
      </Card.Body>
      </Card>
      </Col>
  )}
  </Row>

</Container>
  );
}
//export default Offer_list;

const mapStateToProps = state => ( 
  
  {
  offersList: state.offers.offerList,
  bodyStyles: state.offers.bodyStyles

});
const mapDispatchTopProps = {
  getOffers,
  showModal
}

export default connect(mapStateToProps, mapDispatchTopProps)(OffersList);