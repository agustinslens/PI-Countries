import React from "react";
import './Pagination.css';
const Pagination = ({cardsPerPage, totalCards, paginate})=>{
    const pageNumbers=[]
    for (let i = 1; i <= Math.ceil(totalCards/cardsPerPage); i++) {
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul>
                {pageNumbers.map(number=> (
                       <li > 
                      <button  onClick={()=> paginate(number)}> {number}</button>
                        </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination