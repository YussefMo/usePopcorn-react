import { useState } from "react"
import Stars from "./rating-comp/Stars"

const containerStyle = {
    display : 'flex',
    alignItems : 'center',
    gap : '16px'
}
const starContainerStyle = {
    display : 'flex',
}
const textStyle = {
    lineHight : '1',
    margin : '0',
    color : '#fbbc16'
}

function RatingWindow ({ maxRating = 5 , onSetRating }) {
    const [rating , setRating] = useState(0)
    const [tempRating , setTempRating] = useState(0)

    function handelRating (rating){
        setRating(rating)
        onSetRating(rating)
    }

    return(
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({length : maxRating},(_,i)=>(
                    <Stars 
                    key={i} 
                    onRate={()=>handelRating(i+1)}
                    fill={tempRating? tempRating >= i+1 : rating >= i+1}
                    onHoverIn={()=>setTempRating(i+1)}
                    onHoverOut={()=>setTempRating(0)} />
                ))}
            </div>
            <p style={textStyle}>
                {tempRating || rating || ''}
            </p>
        </div>
    )
}

export default RatingWindow;