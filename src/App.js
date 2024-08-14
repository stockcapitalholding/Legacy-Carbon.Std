import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import i1 from "./assets/images/1.jpg";

const MenuToggle = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: #ffffff;
  font-weight: bold;
  color: #000000;
  width: 200px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
  }
`;

const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

const StyledImg = styled.img`
border-radius: 25px;
  width: 200px;
  height: 200px;
  @media (min-width: 767px) {
    width: 350px;
    height: 350px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #000;
    z-index: 1;
  }

  li {
    margin: 0 10px;

    @media (max-width: 768px) {
      margin: 15px 0;
    }

  }

  a:hover {
     color: white;
}

  a {
    color: #bcbcbc;
    text-decoration: none;
  }
`;

const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 24px;
  background-color: #000;
  position: relative;
  
  .logo {
    display: flex;
    align-items: center;

    img {
      height: 20px;
    }
  }


  .menutoggle {
    font-size: 25px;
    display: none;
    margin-left: 50px;
    justify-content: right;
    color: #fff;

    @media (max-width: 768px) {
    display: block;
  }

  }

  .nav-center {
    display: flex;
    justify-content: center;
    flex: 1;
  }

  .social-links {
    display: flex;
    align-items: center;

    a {
      margin-left: 10px;
    }

    img {
      height: 24px;
      width: 24px;
    }

    img:hover {
  opacity: 0.8;
}
  }
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Carbon.Std...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((100 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Carbon.Std. go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen style={{ backgroundColor: "#111" }}>

      <s.Container flex={1} ai={"center"} style={{ padding: 24 }} >
        <Navbar style={{ backgroundColor: "#111" }}>
          <a href="/" className="logo">
            <img src="https://carbonstd.com/img/logo.png" alt="Logo" />
          </a>
          <MenuToggle className="menutoggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </MenuToggle>
          <div className="nav-center">
            <NavLinks open={menuOpen} style={{ fontSize: 20, fontWeight: "bold" }}>
              <li><a href="https://carbonstd.com/" target="_blank">Carbon.Std</a></li>
              <li><a href="https://carbonstd.gitbook.io/carbon.std" target="_blank">About</a></li>
              <li><a href="https://testnets.opensea.io/collection/carbon-std" target="_blank">Collection</a></li>
            </NavLinks>
          </div>
          <div className="social-links">
            <a href="https://x.com/carbonstd?s=21&t=nVja-RUzpdKwKqRLWJb-Jw" target="_blank" rel="noopener noreferrer">
              <img src="https://watersmemorial.stockcapital.com.br/wp-content/uploads/2024/07/twitter.png" alt="" />
            </a>
            <a href="https://discord.com/invite/tZmRfhbrap" target="_blank" rel="noopener noreferrer">
              <img src="https://watersmemorial.stockcapital.com.br/wp-content/uploads/2024/07/discord.png" alt="" />
            </a>
          </div>
        </Navbar>
      </s.Container>

      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
        <s.TextTitle style={{ textAlign: "center", fontSize: 48, fontWeight: "bold" }}>
          Sustainability
          Bonds + NFT = ReFi.
        </s.TextTitle>
      </s.Container>

      {/* Adding the iframe */}
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
        <iframe
          src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0x7C92c386275E92E74e0873ee7B3F87A64e6EF017&chain=%7B%22name%22%3A%22Sepolia%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F11155111.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Sepolia+Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22sep%22%2C%22chainId%22%3A11155111%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22sepolia%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9%2Fethereum%2F512.png%22%2C%22width%22%3A512%2C%22height%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=6de31e8939cdce4f384791dabfe296b7&theme=dark&primaryColor=teal"
          width="600px"
          height="600px"
          style={{ maxWidth: "100%" }}
          frameborder="0"
        ></iframe>
      </s.Container>


    </s.Screen>
  );
}

export default App;
