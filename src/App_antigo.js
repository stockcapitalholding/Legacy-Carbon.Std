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
        <s.TextTitle style={{ textAlign: "center", fontSize: 56, fontWeight: "bold" }}>
          Carbon.Std Sustainability<br />
          Bonds + NFT = ReFi.
        </s.TextTitle><br></br>
        <s.TextDescription style={{ textAlign: "center", fontSize: 22 }}>
        1000 unique collectible characters with proof <br />of ownership stored on the Ethereum blockchain.
          </s.TextDescription>
        <s.SpacerMedium />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }}>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"example"} src={i1} />
            <s.SpacerMedium />
            <s.TextTitle style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}>
              {data.totalSupply}/1000
            </s.TextTitle>
          </s.Container>
          <s.SpacerMedium />
          <s.Container flex={1} jc={"center"} ai={"center"} style={{ backgroundColor: "#383838", borderRadius:25, padding: 24 }}>
            {Number(data.totalSupply) === 1000 ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The sale has ended.
                </s.TextTitle>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  You can still find Carbon.Std on{" "}
                  <a target={"_blank"} href={"https://opensea.io/CarbonStd"}>
                    Opensea.io
                  </a>
                </s.TextDescription>
              </>
            ) : (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  1 NCC costs 100 MATIC.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  Excluding gas fee.
                </s.TextDescription>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  {feedback}
                </s.TextDescription>
                <s.SpacerMedium />
                {blockchain.account === "" || blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      Connect to the Polygon network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}>
                      CONNECT WALLET
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center" }}>
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY 1"}
                    </StyledButton>
                  </s.Container>
                )}
              </>
            )}
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerSmall />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription style={{ textAlign: "center", fontSize: 16 }}>
            Please make sure you are connected to the right network (Polygon Mainnet) and the correct address. Please note: Once you make the purchase, you cannot undo this action.
          </s.TextDescription>
          <s.SpacerSmall />
          {/* <s.TextDescription style={{ textAlign: "center", fontSize: 18 }}>
            We have set the gas limit to 285000 for the contract to successfully mint your NFT. We recommend that you don't change the gas limit.
          </s.TextDescription> */}
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
