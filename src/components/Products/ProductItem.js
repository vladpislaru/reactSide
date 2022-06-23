import React , {  useState, useRef, useContext, useEffect } from "react";
import '../../static/CSS/ProductItem.css'
import storeImage from '../../static/storeExample.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar, faStarHalf, faCartShopping} from '@fortawesome/free-solid-svg-icons/'
const ProductItem = () => {
    console.log(storeImage);
    return(
        <>
            <div id="container">	
	
    
                <div className="product-details">
                    
                
                    <h1>Biru Putaran</h1>
                
                    <span className="hint-star star">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalf} />

                    </span>
                        
                        
                    <p className="information1">" Especially good for container gardening, the Angelonia will keep blooming all summer even if old flowers are removed. Once tall enough to cut, bring them inside and you'll notice a light scent that some say is reminiscent of apples. "</p>
                
                        
                        
                
                    <div className="control1">
                        
                    
                        <button className="buton">
                
                            <span className="price">49 $</span>
                        
                            <span className="shopping-cart"><FontAwesomeIcon icon={faCartShopping}/></span>
                        
                            <span className="buy">Buy Now</span>
                        </button>
                    
                        
                    </div>
                    
                </div>
    
            
                <div className="product-image">
                    
                    <img src={storeImage} alt="Omar Dsoky"/>
                    
                    <div className="info">
                        <h2>The Description</h2>
                        <ul >
                            <li><strong>Sun Needs: </strong>Full Sun</li>
                            <li><strong>Soil Needs: </strong>Damp</li>
                            <li><strong>Zones: </strong>9 - 11</li>
                            <li><strong>Height: </strong>2 - 3 feet</li>
                            <li><strong>Blooms in: </strong>Mid‑Summer - Mid‑Fall</li>
                            <li><strong>Features: </strong>Tolerates heat</li>
                            <li><strong>Sun Needs: </strong>Full Sun</li>
                            <li><strong>Soil Needs: </strong>Damp</li>
                            <li><strong>Zones: </strong>9 - 11</li>
                            <li><strong>Height: </strong>2 - 3 feet</li>
                            <li><strong>Blooms in: </strong>Mid‑Summer - Mid‑Fall</li>
                            <li><strong>Features: </strong>Tolerates heat</li>
                        </ul>
                    </div>
                </div>
        
            </div>
        </>
    )
}

export default ProductItem;