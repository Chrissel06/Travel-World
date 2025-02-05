import React from "react";
import '../styles/about.css'
import {Container,Row,Col,FormGroup} from 'reactstrap';
const Home = () =>  {
    return <>
<section> 
<Container>
 <Row>
     <Col lg='6'>
     <div className="experience__content">
         <Subtitle subtitle={'Experience'}/>

         <h2>With our all experience <br /> we will serve you</h2>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
             <br /> 
             Maecenas ligula massa, varius a, semper congue, euismod non, mi.
             </p>
     </div>
     </Col>
     </Row>
     </Container>
     </section>
     </>
}



export default about;
