import React, { useState, useEffect } from "react";
import { Row, Card, Col, Input } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchMarketState } from "../../redux/actions";
import Loader2 from "./../Loader/Loader2";
import Loader from "./../Loader/Loader";
import { useNavbarContext } from "../../context/navbarContext";
const Cryptocurrencies = ({ simplified }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const { setSelectedIndex } = useNavbarContext();
  const coins = useSelector((state) => state.cryptoReducer.coins);

  const coinsArray = simplified ? coins.slice(0, 10) : coins;
  useEffect(() => {
    dispatch(fetchMarketState());
  }, [dispatch]);
  if (!coins.length && simplified)
    return (
      <Row gutter={[50, 50]}>
        {Array.from(Array(10)).map((news, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
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
              <Link
                to={`/crypto/${coin.uuid}`}
                onClick={() => {
                  setSelectedIndex("1");
                }}
              >
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
                      {Math.floor(coin.price)}
                      {coin.price.indexOf(".") < 3 &&
                        coin.price.substring(coin.price.indexOf("."), 5)}
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
                        coin.change > 0
                          ? {
                              color: "green",
                              fontWeight: "700",
                              paddingLeft: "5px",
                            }
                          : coin.change == (0 || null)
                          ? {
                              color: "gray",
                              fontWeight: "700",
                              paddingLeft: "5px",
                            }
                          : {
                              color: "red",
                              fontWeight: "700",
                              paddingLeft: "5px",
                            }
                      }
                    >
                      {coin.change ? coin.change : 0}%
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
