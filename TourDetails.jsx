import React,{useEffect, useRef,useState,useContext} from "react"; 
import "../styles/tour-details.css";
import { Container,Row,Col, Form,ListGroup} from 'reactstrap'; 
import { useParams } from "react-router-dom";


import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import useFetch from "../hooks/useFetch";
import{BASE_URL} from './../utils/config';
import{AuthContext} from "./../context/AuthContext";
const TourDetails = () => {
    const { _id } = useParams();
    console.log("Current URL:", window.location.href);
console.log("Extracted ID:", _id);
    console.log( _id);
    //check the value of id in console
    
    const reviewMsgRef = useRef("");
    const[tourRating,setTourRating] = useState(null);
    const{user} = useContext(AuthContext)



    //fetch data from database
    const { data:tour,loading,error } = useFetch(`${BASE_URL}/tours/6537b52cd3e5cd4763ddc549`);
    

    
    //destructure properties from tour object
    const {
        photo,
        title,
        desc,
        price,
        reviews,
        city,
        address,
        distance,
     
        maxGroupSize,
       
      
       
       } = tour || {};

   
    
   
    const {totalRating,avgRating}=calculateAvgRating(reviews);
    


    
    // formal date
    const options={day:'numeric',month:'long',year:'numeric'};

    //submit request to the server
    const submitHandler = async (e) => {
        e.preventDefault()
        const reviewText = reviewMsgRef.current.value;

       
       
       
       try {
        if(!user || user===undefined ||  user===null){
            alert('Please sign in')
        }

        const reviewObj = {
            username:user?.username,
            reviewText,
            rating:tourRating,
        }


        const res = await fetch(`${BASE_URL}/review/${_id}`,{
            method:'post',
            headers:{
                'Content-type':'applications/json'
            },
            credentials:'include',
            body:JSON.stringify(reviewObj)
        });

       const result= await res.json();
       if(!res.ok) {
        return alert(result.message);
       }


       alert(result.message);

     



       } catch (err) {
        alert(err.message);
        
       }
    };

    useEffect(()=>{
        window.scrollTo(0,0)
    },[tour]);


    return (
    <>

    <section>
        <Container>
            {
                loading && <h4 className="text-center pt-5">Loading.........</h4>
            }
             {
                error&& <h4 className="text-center pt-5">{error}.</h4>
            }


            {
                !loading && !error && <Row>
                <Col lg='8'>
                    <div className="tour__content">
                        <img src= {photo} alt=""/>
                        <div className="tour__info">
                            <h2> {title}</h2>

                            <div className="d-flex align-items-center gap-5">

                                <span className ="d-flex align-items-center gap-1">
                    <i class="ri-star-s-fill"
                        style={{color: "var(--secondary-color)"}}>
                    </i>
                    {avgRating === 0? null : avgRating}
                    {totalRating === 0? (
                        "Not rated"
                    ) : (
                        <span> ({reviews?.length})</span>
                    )  }             
                                </span>
                                <span>
                                    <i class ="ri-map-pin-user-fill"></i>{address}
                                </span>
                            </div>

                            <div className="tour__extra-details">
                                <span>
                                    <i class="ri-map-pin-2-line"></i>{city}
                                </span>
                                <span>
                                    <i class="ri-money-dollar-circle-line"></i> ${price}/per person
                                </span>
                                <span>
                                    <i class="ri-map-pin-time-line"></i> {distance} k/m
                                </span>
                                <span>
                                    <i class="ri-group-line"></i>{maxGroupSize} people
                                </span>
                            </div>
                            <h5>Description</h5>
                            <p>{desc}</p>
                            
                        </div>

                        {/*===================tour review section============================*/}
                        <div className="tour__reviews mt-4">
                            <h4>Reviews( {reviews?.length} reviews )</h4>

                            <Form onSubmit= {submitHandler}>
                                <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                                    <span onClick={()=> setTourRating(1)}>
                                        1 <i class = "ri-star-s-fill"></i>
                                    </span>
                                    <span onClick={()=> setTourRating(2)}>
                                        2 <i class = "ri-star-s-fill"></i>
                                    </span>
                                    <span onClick={()=> setTourRating(3)}>
                                        3 <i class = "ri-star-s-fill"></i>
                                    </span>
                                    <span onClick={()=> setTourRating(4)}>
                                        4 <i class = "ri-star-s-fill"></i>
                                    </span>
                                    <span onClick={()=> setTourRating(5)}>
                                        5 <i class = "ri-star-s-fill"></i>
                                    </span>
                                </div>

                                <div className ="review__input">
                                    <input type="text" ref={reviewMsgRef}
                                     placeholder="share your thoughts"
                                     required
                                     />
                                    <button 
                                       className="btn primary__btn text-white"
                                       type="submit"
                                       >
                                        Submit
                                       </button>
                                </div>
                            </Form>
                            <ListGroup className="user_ _reviews">
                                { reviews?.map(review => (
                                        <div className="review_ _item">
                                            <img src={avatar} alt=""/>
                                            <div className="w-100">
                                                <div className="d-flex align-items-center
                                                justify-content-between">
                                                    <div>
                                                        <h5>{review.username}</h5>
                                                        <p>
                                                            {new Date(review.createAt).toLocaleDateString(
                                                                "en-US",
                                                                options
                                                            )}
                                                        </p>
                                                    </div>
                                                    <span className="d-flex align-items-center">
                                                        {review.rating}
                                                        <i className="ri-star-s-fill"></i>
                                                    </span>
                                                                                                
                                                    
                                                
                                                </div>
                                                <h6>{review.reviewText}</h6>
                                            </div>
                                        </div>
                                    ))
                                }
                            </ListGroup>
                        </div>
                        {/*=============tour review section end===========*/}
                    </div>
                </Col>
                <Col lg='4'>
                    <Booking tour={tour} avgRating={avgRating}/>

                </Col>
            </Row>
}
        </Container>
    </section>
    
    
    
    
    
    
    
    
        </>
    
    );

};
export default TourDetails;






