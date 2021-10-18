import React, { useState, useEffect } from "react";
import { Row, Card, Col, Input } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchMarketState } from "../../redux/actions";
import Loader2 from "./../Loader/Loader2";
import Loader from "./../Loader/Loader";
const Cryptocurrencies = ({ simplified }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const coins = useSelector((state) => state.cryptoReducer.coins);
  const coinsArray = simplified ? coins.slice(0, 10) : coins;
  useEffect(() => {
    dispatch(fetchMarketState());
  }, [dispatch]);
  if (!coins.length && simplified)
    return (
      <Row gutter={[24, 24]}>
        {Array.from(Array(10)).map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className="news-card">
              <Loader2 />
            </Card>
          </Col>
        ))}
      </Row>
    );
  if (!coins.length && !simplified) return <Loader />;
  return (
    <div>
      {!simplified && (
        <div className="search-crypto">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Cryptocurrency..."
          />
        </div>
      )}
      <Row gutter={[50, 50]} className="crypto-card-container">
        {coinsArray
          ?.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))
          .map((coin) => (
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.id}>
              <Link to={`/crypto/${coin.id}`}>
                <Card
                  style={{ borderRadius: "8px" }}
                  title={`${coin.rank}. ${coin.name}`}
                  extra={
                    <img
                      className="crypto-image"
                      src={`${coin.iconUrl}`}
                      alt="coin"
                    />
                  }
                  hoverable
                >
                  <p>
                    Price:
                    <span style={{ fontWeight: "700", paddingLeft: "5px" }}>
                      {millify(parseInt(coin.price), {
                        precision: 4,
                        decimalSeparator: ",",
                      })}
                    </span>
                  </p>
                  <p>
                    Market Cap:
                    <span style={{ fontWeight: "700", paddingLeft: "5px" }}>
                      {millify(parseInt(coin.marketCap))}
                    </span>
                  </p>
                  <p>
                    24h Volume:
                    <span style={{ fontWeight: "700", paddingLeft: "5px" }}>
                      {millify(parseInt(coin["24hVolume"]))}
                    </span>
                  </p>
                  <p>
                    Daily Change:
                    <span
                      style={
                        millify(parseInt(coin.change)) > 0
                          ? {
                              color: "green",
                              fontWeight: "700",
                              paddingLeft: "5px",
                            }
                          : millify(parseInt(coin.change)) == 0
                          ? {
                              color: "gray",
                              fontWeight: "700",
                              paddingLeft: "5px",
                            }
                          : {
                              color: "green",
                              fontWeight: "700",
                              paddingLeft: "5px",
                            }
                      }
                    >
                      {millify(parseInt(coin.change))}%
                    </span>
                  </p>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Cryptocurrencies;
