import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setCoin] = useState("");
  const [dollar, setDollar] = useState(0);

  const onSelectChange = (event) => {
    setCoin(event.target.value);
  };

  const onInputChange = (event) => {
    setDollar(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Coin Converter</h1>
      {loading ? (
        "loading..."
      ) : (
        <div>
          <select onChange={onSelectChange} value={selectedCoin}>
            <option>코인을 선택해주세요.</option>
            {coins.map((item, idx) => (
              <option value={item.quotes.USD.price} key={idx}>
                {item.name}({item.symbol}) | ${item.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <input placeholder="$" value={dollar} onChange={onInputChange} />
          <div>
            <h3>
              You can get&nbsp;
              {selectedCoin > 0
                ? Math.round((selectedCoin / dollar) * 100) / 100
                : 0}{" "}
              coin
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
