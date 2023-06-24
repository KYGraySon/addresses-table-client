import SearchBox from "../components/SearchBox";

const Address = () => {

  // const tokenlists = useMemo(() => [
  //   "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link",
  //   "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokenlist.zerion.eth.link",
  //   "https://raw.githubusercontent.com/jab416171/uniswap-pairtokens/master/uniswap_pair_tokens.json",
  //   "https://gateway.ipfs.io/ipns/tokens.uniswap.org",
  //   "https://static.optimism.io/optimism.tokenlist.json",
  //   "https://uniswap.mycryptoapi.com/",
  //   "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://t2crtokens.eth.link",
  //   "https://tokens.coingecko.com/uniswap/all.json",
  //   "",
  // ], []);

  return (
    <div className="min-h-screen">
      <div className="mt-80">
      <SearchBox />
      </div>
      {/* <PortfolioLayout /> */}
    </div>
  );
};

export default Address;
