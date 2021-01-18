import React, { useState, useEffect } from 'react';
import { Button, Container, DropdownButton, Form, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getPrices } from '../../helpers/dropDownItems'
import { filterOffers } from '../../redux/actions/offersActions';

const SearchPage = (props) => {


  const [searchParams, setsearchParams] = useState({ "carTypes": [], "firstLoad": true });
  let prices = getPrices();

  useEffect(() => {
    if (searchParams.firstLoad == false)
      props.filterOffers(searchParams);
  }, [searchParams]);


  const searchOffers = (type, value) => {
    let newSearchParams = { ...searchParams, "firstLoad": false };

    if (searchParams[type] && (value === "all" || value === false)) {
      //delete item
      delete newSearchParams[type];
      setsearchParams(newSearchParams);
    }
    else {
      if (type === "carTypes") {
        const index = newSearchParams[type].indexOf(value);
        if (index > -1) {
          newSearchParams[type].splice(index, 1);
        }
        else {
          newSearchParams[type].push(value);
        }
      }
      else {
        newSearchParams[type] = value;
      }
      setsearchParams(newSearchParams);
    }
  }
  const refreshFilter = () => {
    setsearchParams({ "carTypes": [], "firstLoad": false });
  }

  return (
    <div className="search-panel">
      <Container >
        <Row xs={2} md={2} lg={5}>

          <Col>
            <Form.Group>
              <Form.Control size="sm" as="select" value={searchParams["priceUpTo"] || "all"} onChange={(e) => searchOffers("priceUpTo", e.target.value)}>
                {prices && prices.map(item => <option key={item} value={item}>{item + ' €'}</option>)}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control size="sm" as="select" value={searchParams["numOfSeats"] || "all"} onChange={(e) => searchOffers("numOfSeats", e.target.value)}>
                <option value="all">Number of seats</option>
                <option value="2">2 seats</option>
                <option value="4">4 seats</option>
                <option value="5">5 seats</option>
                <option value="8">8 seats</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Check
                onChange={(e) => searchOffers("onlyAutomatic", e.target.checked)}
                checked={searchParams["onlyAutomatic"] ? true : false}
                type="checkbox"
                id="customControlAutosizing"
                label="only automatic"
                custom
                style={{ color: "white" }}
              />

            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <DropdownButton block="true" variant="outline-light" title="Car Type" size="sm" >
                <div className="body-types-drop">
                  {Object.keys(props.bodyStyles).map((item) =>
                    <Form.Check key={item} onChange={(e) => searchOffers("carTypes", item)}
                      style={{ marginBottom: "15px" }} custom type="checkbox" id={item} label={item}
                      checked={searchParams["carTypes"] && searchParams["carTypes"].indexOf(item) != -1}
                    />)}
                </div>
              </DropdownButton>
            </Form.Group>
          </Col>
          <Col xs={12} md={12}><Button variant="outline-light" size="sm" block="true" onClick={refreshFilter}>Clear filter</Button></Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = state => (
  {
    bodyStyles: state.offers.bodyStyles
  });
export default connect(mapStateToProps, { filterOffers })(SearchPage);