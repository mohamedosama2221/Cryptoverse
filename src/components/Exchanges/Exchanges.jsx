import React, { useEffect } from "react";
import millify from "millify";
import { Row, Col, Typography, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../Loader/Loader";
import { fetchExchanges } from "./../../redux/actions";

const { Text } = Typography;

const Exchanges = () => {
  const dispatch = useDispatch();
  const exchangesStates = useSelector((state) => state.cryptoReducer.exchanges);
  useEffect(() => {
    dispatch(fetchExchanges());
  }, []);

  if (!exchangesStates.exchanges || !exchangesStates.stats) return <Loader />;

  return (
    <>
      <Row style={{ fontWeight: "bold", marginBottom: "20px" }}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row gutter={[25, 25]}>
        {exchangesStates.exchanges.map((exchange) => (
          <Col span={24} key={exchange.uuid}>
            <Row key={exchange.uuid}>
              <Col span={6}>
                <Text>
                  <strong>{exchange.rank}.</strong>
                </Text>
                <Avatar className="exchange-image" src={exchange.iconUrl} />
                <Text>
                  <strong>{exchange.name}</strong>
                </Text>
              </Col>
              <Col span={6} style={{ fontWeight: "bold" }}>
                {millify(exchange["24hVolume"])}
              </Col>
              <Col span={6} style={{ fontWeight: "bold" }}>
                {millify(exchange.numberOfMarkets)}
              </Col>
              <Col span={6} style={{ fontWeight: "bold" }}>
                {millify(exchange.marketShare)}%
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
