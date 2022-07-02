import React , {  useState, useRef, useContext, useEffect } from "react";
import '../../static/CSS/ProductItem.css'
import storeImage from '../../static/storeExample.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar, faStarHalf, faCartShopping} from '@fortawesome/free-solid-svg-icons/'
import { Button } from "react-bootstrap";

const ProductItem = (props) => {
   

    console.log(storeImage);
    return(
        <>
            <div id="container">	
	
    
                <div className="product-details">
                    
                
                    <h1>{props.attributes?.Name}</h1>
                
                    <span className="hint-star star">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalf} />

                    </span>
                        
                    <p> </p>
                    <span style={{color:"blue", fontSize:"30px", fontWeight:"bold", fontFamily: "'Farsan', cursive", paddingLeft:"10px"}}>Made by</span>
                    <p className="information1" style={{color:"black", fontSize:"25px", fontWeight:"bold"}}></p>
                    <span ><Button variant="outline-primary" style={{ fontSize:"30px", fontWeight:"bold", fontFamily: "'Farsan', cursive", width:"200px", border:"0", textAlign:"left"}}>{props.attributes?.Publisher}</Button>{' '}</span>
                      
                    <div className="control1">
                        
                    
                        <button className="buton">
                
                            <span className="price">{props.attributes?.Price} $</span>
                        
                            <span className="shopping-cart"><FontAwesomeIcon icon={faCartShopping}/></span>
                        
                            <span className="buy">Buy Now</span>
                        </button>
                    
                        
                    </div>
                    
                </div>
    
            
                <div className="product-image">
                    
                    <img src={storeImage} alt="Omar Dsoky"/>
                    
                    <div className="info">
                        <h2 style={{marginTop:"10px"}}>The Description</h2>
                        <ul >
                            {props.attributes?.Description}
                        </ul>
                    </div>
                </div>
        
            </div>
        </>
    )
}

export default ProductItem;