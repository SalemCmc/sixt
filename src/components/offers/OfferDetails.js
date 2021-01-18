import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOfferDetails } from '../../redux/actions/offersActions';
import { Carousel, Accordion, Button, Row, Col, Spinner } from 'react-bootstrap';
import noPhotoCar from '../../helpers/noPhotoCar.jpg';

const OfferDetails = (props) => {

  let carGroupInfo = props.offerDetails && props.offerDetails.carGroupInfo;

  useEffect(() => {
    //https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
    function doSomething() { props.getOfferDetails(props.itemID); }
    doSomething();
  }, [props]);


  const convertBoolToText = (param) => {
    if (param === null)
      return "-";
    if (param === true)
      return "YES"
    return "NO"
  }

  return (

    props.offerDetails == null ?
      <Spinner animation="border" variant="light" />
      :
      <React.Fragment>
        <Carousel>
          {props.offerDetails && props.offerDetails.splashImages ? props.offerDetails.splashImages.map((item, index) =>
            <Carousel.Item interval={1000} key={index}>
              <img className="d-block w-100" src={item.wideLarge} alt="First slide" />
              <Carousel.Caption>
                <p>{props.offerDetails && props.offerDetails.includedCharges[index] && props.offerDetails.includedCharges[index].title}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )
            : <img className="d-block w-100" src={noPhotoCar} alt="noPhoto" />
          }
        </Carousel>

        <Accordion>
          <Accordion.Toggle as={Button} variant="secondary" size="sm" block eventKey="0">SHOW DETAILS </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <React.Fragment>
              <div className="offer-details-header">
                <h3 >{props.offerDetails.headlines.description}</h3>
                <p >{props.offerDetails.headlines.longSubline}</p>
              </div>
              <Row xs={1} md={2} lg={4} style={{ padding: "10px" }}>
                <Col>
                  <label >Automatic
                    <p><b>{convertBoolToText(carGroupInfo.automatic)}</b></p>
                  </label>
                  <br />
                  <label >Air condition
                    <p><b>{convertBoolToText(carGroupInfo.airCondition)}</b></p>
                  </label>
                  <br />
                  <label >Max passengers
                    <p><b>{carGroupInfo.maxPassengers}</b></p>
                  </label>
                </Col>
                <Col>
                  <label >Driver min age
                    <p><b>{carGroupInfo.driverRequirements.minAge}</b></p>
                  </label>
                  <br />
                  <label >Navigation system
                    <p><b>{convertBoolToText(carGroupInfo.navigationSystem)}</b></p>
                  </label>
                  <br />
                  <label >Model guaranteed
                    <p><b>{convertBoolToText(carGroupInfo.modelGuaranteed)}</b></p>
                  </label>
                </Col>
                <Col>
                  <label >Premium
                    <p><b>{convertBoolToText(carGroupInfo.premium)}</b></p>
                  </label>
                  <br />
                  <label >Luxury
                    <p><b>{convertBoolToText(carGroupInfo.luxury)}</b></p>
                  </label>
                  <br />
                  <label >Doors
                    <p><b>{carGroupInfo.doors}</b></p>
                  </label>
                </Col>
                <Col>
                  <label >Tax
                    <p><b>{props.offerDetails.prices.dayPrice.taxInfo}</b></p>
                  </label>
                  <br />
                  <label >Price
                    <p><b>{props.offerDetails.prices.dayPrice.trackingNet}</b></p>
                  </label>
                  <br />
                  <label >Total price per day
                    <h3><b>{props.offerDetails.prices.dayPrice.tracking + ' €'}</b></h3>
                  </label>
                </Col>
              </Row>
            </React.Fragment>
          </Accordion.Collapse>
        </Accordion>

      </React.Fragment>
  );
}

const mapStateToProps = state => ({ offerDetails: state.offers.offerDetails, });
const mapDispatchTopProps = { getOfferDetails, }

export default connect(mapStateToProps, mapDispatchTopProps)(OfferDetails);
