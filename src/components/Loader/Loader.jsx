import React from 'react';
import RingLoader from "react-spinners/RingLoader";


const Loader = () => {
    return (
        <div style={{minHeight:'100vh',display:'flex', justifyContent:"center" , alignItems:'center'}}>
        <RingLoader size={70}  color="#001529" />
      </div>
    )
}

export default Loader
