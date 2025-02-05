import React from "react";
import ServiceCard from "./ServiceCard";
import{Col} from "reactstrap";

import weatherImg from '../assets/images/Orange cashapp icon.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData =[
    {
        imgUrl: weatherImg,
        title: <a href="https://material.money/">Currency Converter</a>,
        desc:
          "Say goodbye to the complexity of currency math and hello to the simplicity of seamless conversion. Whether you're a seasoned traveler, a savvy investor, or a digital nomad, we've got your back. Convert currencies with confidence, embrace new opportunities, and watch your money go the distance. Join us in the currency conversion revolution, where your financial horizons know no bounds.."
      },
    {
        imgUrl: guideImg,
        title:  <a href="http://127.0.0.1:5505/menu.html">ITINERARY PLANS</a>,
        desc:"Your travel dreams, your way! Our itinerary plans is the key to unlocking unforgettable experiences Embrace the art of travel planning with our intuitive itinerary plans.  Your next unforgettable journey starts right here, where every moment is a brushstroke on the canvas of your wanderlust."
        
     },
     {
         imgUrl: customizationImg,
         title: <a href="http://127.0.0.1:5504/TRAVEL%20TIPS.html">TRAVEL TIPS!</a>,
         desc:"Explore the world like a pro with our travel tips and hacks. From savvy packing to budget-friendly adventures, we've got the inside scoop. Unlock the art of hassle-free travel, where every moment is a discovery, and every journey an adventure. Let's turn your trips into tales of triumph, one tip at a time"
            
     },

]
const ServiceList = () =>  {
    return <>
    {
        servicesData.map((item,index)=> <Col lg="3" md='6' sm='12' className="mb-4" key={index}>
            <ServiceCard item={item}/>
            </Col>)
    }
    </>
    
};

export default ServiceList;