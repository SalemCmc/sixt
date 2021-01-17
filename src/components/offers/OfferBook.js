import React, { useState} from 'react';
import { connect } from 'react-redux';
import {getHours} from '../../helpers/dropDownItems'
import {Button, Image, Col, Row, Form, Spinner  } from 'react-bootstrap';
import {bookOffer} from '../../redux/actions/offersActions'


 const OfferBook=(props) => {

    const [validated, setValidated] = useState(false);
    const [booking, setBooking] = useState({});
    const [showSpiner, setShowSpiner] = useState(false);
    const hours=getHours();

    let currentDate= new Date();
    let currentMonth=(currentDate.getMonth()+1).toString();
    if(currentMonth.length===1)
    currentMonth="0"+currentMonth;
    const minDate=currentDate.getFullYear()+'-'+currentMonth+'-'+currentDate.getDate();
    
    const saveBooking =()=>
    {
      setShowSpiner(true);
      let newBooking={...booking,offerID: props.itemID };
      props.bookOffer(newBooking);
    }
    const handleInput =(e)=>
    {
      setBooking({...booking,    [e.target.name] : e.target.value     })
    }
    const handleSubmit = (event) => {
        
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget;

      if (form.checkValidity() === true) 
      {
        saveBooking(); 
      }
      setValidated(true);
     };

  return (  
   <div style={{padding: "15px"}}>
       <h3>Booking car</h3>
       <Row xs={1} md={2} lg={2}>
             <Col >
             <Image src={props.itemImage } fluid />     
            </Col>
             <Col >
             {showSpiner===true?  <center style={{ marginTop: "15%"}}><Spinner animation="border" /> <h3>Booking in progress...</h3></center>:
            
             <Form noValidate validated={validated} onSubmit={handleSubmit} >

             <Form.Row>
                <Form.Group as={Col} md={12} lg={8} xs={12} >
                     <b>Pick-up date</b>
                     <Form.Control name="datePickUp" type="date" size="sm" placeholder="Enter email" required min={minDate} onChange={(e)=>handleInput(e)}/>
                </Form.Group>
               
                <Form.Group as={Col} >
                <b>Pick-up time</b>
                <Form.Control  name="timePickUp" as="select" size="sm" defaultValue="09:00" required onChange={(e)=>handleInput(e)}>
                  {hours && hours.map(item=> <option key={item} value={item}>{item +' h'}</option>  )}
                </Form.Control>
                </Form.Group>
             </Form.Row>
           <Form.Row>
                <Form.Group as={Col} md={12} lg={8} xs={12}>
                     <b>Return</b>
                     <Form.Control name="dateReturn" type="date" size="sm" placeholder="Enter email" required min={booking["datePickUp"] || minDate} onChange={(e)=>handleInput(e)}/>
                </Form.Group>
               
                <Form.Group as={Col}>
                <b>Return time</b>
                <Form.Control name="timeReturn" as="select" size="sm" defaultValue="09:00" required onChange={(e)=>handleInput(e)}>
                {hours && hours.map(item=> <option key={item} value={item}>{item +' h'}</option>  )}  
                </Form.Control>
                </Form.Group>
            </Form.Row>

             <Form.Row>
                    <Form.Group as={Col} >
                      <b>Your name</b>
                      <Form.Control name="customerName" size="sm" type="text" required onChange={(e)=>handleInput(e)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                      <b>Your last name</b>
                      <Form.Control name="customerLastName" size="sm" type="text" required onChange={(e)=>handleInput(e)}/>
                    </Form.Group>
                </Form.Row>
      
 
      <Button type="submit" variant="success" size="sm" block >COMPLETE YOUR BOOKING</Button>
    </Form>
              }

            </Col>
        </Row>

   </div>
    
  );
}


const mapStateToProps = state => ( 
  
    {
        //offerDetails: state.offers.offerDetails,
        
  });
  const mapDispatchTopProps = {
    bookOffer,

  }
  
  export default connect(mapStateToProps, mapDispatchTopProps)(OfferBook);
