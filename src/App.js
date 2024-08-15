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
              <li><a href="https://opensea.io/CarbonStd" target="_blank">Collection</a></li>
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

      <ResponsiveWrapper flex={1} style={{ padding: 24 }}>
        <iframe
          src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0x9D4263E7af76FE039FcE6405C4169A450371Ce34&chain=%7B%22name%22%3A%22Ethereum+Mainnet%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F1.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22eth%22%2C%22chainId%22%3A1%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22ethereum%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmdwQDr6vmBtXmK2TmknkEuZNoaDqTasFdZdu3DRw8b2wt%22%2C%22width%22%3A1000%2C%22height%22%3A1628%2C%22format%22%3A%22png%22%7D%7D&clientId=9a4b692962c8c63f4c6e01d09f3a9f69&theme=dark&primaryColor=cyan"
          width="600px"
          height="600px"
          style={{ maxWidth: "100%" }}
          frameborder="0"
        ></iframe>
        <s.SpacerMedium />
        <s.Container
          flex={1}
          jc={"center"}
          ai={"center"}
          style={{ backgroundColor: "rgb(17, 17, 17)", padding: 24 }}
        >
          <s.TextTitle style={{ textAlign: "center", fontSize: 48, fontWeight: "bold" }}>
          Carbon.Std Legacy Airdrop
        </s.TextTitle>
          <s.TextTitle style={{ textAlign: "center", padding: 24 }}>
          The Carbon.Std project, in crafting the Legacy collection, drew inspiration from the concept of reconnecting humanity and technology amidst environmental devastation. The collection envisions a dystopian future, where Earth has been driven to the brink of destruction due to prolonged environmental neglect. In this bleak scenario, Carbon.Std captures the pivotal moment when a desperate human hand reaches out to grasp an advanced robotic hand, symbolizing both hope and alliance.
          </s.TextTitle>
          <s.TextTitle style={{ textAlign: "center", padding: 24 }}>
          The Legacy collection is designed to represent the critical convergence of man and machine, serving as a powerful metaphor for humanity's final effort to save the planet. This project aims to communicate that, even in the face of overwhelming devastation, there remains a possibility to unite and reverse the damage, rebuilding Earth from the ruins of chaos. Through this narrative, Carbon.Std underscores the importance of collaboration between humanity and technology, aligning with the company’s mission to advance environmental preservation and foster a new era of sustainability and global responsibility.
          </s.TextTitle>
        </s.Container>
      </ResponsiveWrapper>
    </s.Screen>
  );
}

export default App;
