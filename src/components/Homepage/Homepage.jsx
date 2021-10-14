import React, { useEffect } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMarketState } from "../../redux/actions";
import { useSelector } from "react-redux";
import { Cryptocurrencies } from "..";
import News from "./../News/News";
const { Title } = Typography;

const Homepage = () => {
  const dispatch = useDispatch();
  const {
    total24hVolume,
    totalCoins,
    totalExchanges,
    totalMarketCap,
    totalMarkets,
  } = useSelector((state) => state.cryptoReducer.MarketState);

  useEffect(() => {
    dispatch(fetchMarketState());
  }, [dispatch]);
  return (
    <div>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={totalCoins && parseInt(totalCoins)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={totalExchanges && millify(parseInt(totalExchanges))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={totalMarketCap && millify(parseInt(totalMarketCap))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={total24hVolume && millify(parseInt(total24hVolume))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={totalMarkets && millify(parseInt(totalMarkets))}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={5} className="show-more">
          <Link to="/Cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={5} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </div>
  );
};

export default Homepage;
