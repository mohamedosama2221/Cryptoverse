import React, { useState } from 'react'
import { Row, Card , Col , Input } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { useSelector } from 'react-redux';
import Loader from './../Loader/Loader';
const Cryptocurrencies = ({simplified}) => {
    const [query, setQuery] = useState('')
    const coins = useSelector(state => state.coins)
    const coinsArray = (simplified) ? coins.slice(0,10) : coins
    if(!coins.length) return( <Loader/>)
    return (
        <div>
           {!simplified && <div className='search-crypto' ><Input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search Cryptocurrency" style={{borderRadius:'8px'}}/></div>}
            <Row gutter={[50,50]} className="crypto-card-container">
                {coinsArray?.filter(e=> e.name.toLowerCase().includes(query.toLowerCase())).map(coin =>(
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.id}>
                        <Link to={`/crypto/${coin.id}`}>
                            <Card style={{borderRadius:'8px'}}  title={`${coin.rank}. ${coin.name}`}
                            extra={<img className='crypto-image' src={`${coin.iconUrl}`} alt="coin"/>} hoverable>
                                <p>Price:<span style={{fontWeight:'700'}}> {millify(parseInt(coin.price),{
                                        precision: 4,  
                                        decimalSeparator: ","
                                        })}</span> </p>
                                <p>Market Cap:<span style={{fontWeight:'700'}}> {millify(parseInt(coin.marketCap))}</span> </p>
                                <p>24hVolume:<span style={{fontWeight:'700'}}> {millify(parseInt(coin['24hVolume']))}</span></p>
                                <p style={millify(parseInt(coin.change)) > 0 ?{ color:'green'} : { color:'red'} }>Daily Change:<span style={{fontWeight:'700'}}> {millify(parseInt(coin.change))}%</span></p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Cryptocurrencies
