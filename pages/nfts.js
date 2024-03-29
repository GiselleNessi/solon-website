import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Title from '../components/Title'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import Section from '../components/Section'
import Spacer from '../components/Spacer'
import Animate from '../components/Animate'
import { useMediaQuery } from 'react-responsive'
import { useMoralis } from 'react-moralis'
import abi from '../json/solonNftsAbi.json'
import nftData from '../json/nftDataByName.json'

export default function NFTs() {
  const small = useMediaQuery({query: "(max-width: 880px)"})
  const [name, setName] = useState("A")

  return (
    <main>
      <Head>
        <title>Solon - NFTs</title>
      </Head>

      <Spacer height="16px" />

      <Animate>
        {
          small ? (
            <>
              <Video name={name} />
              <Spacer height="24px" />
              <Options name={name} setName={setName} />
              <Spacer height="24px" />
              <Menu name={name} setName={setName} />
            </>
          ) : (
            <div className="viewer">
              <div>
                <Video name={name} />
              </div>
              <Spacer width="24px" />
              <div className="viewer-menu">
                <Menu name={name} setName={setName} />
                <Spacer flexGrow="1" />
                <Options name={name} setName={setName} />
              </div>
            </div>
          )
        }
      </Animate>

      <Spacer height="24px" />

      <Mint />

      <Spacer height="64px" />

      <Section image="/blob2.png">
        <Title>Why purchase a Solon NFT?</Title>
        <Paragraph>
          Aside from the amazing 1/1 artificial intelligence generated art pieces, Solon NFT holders will also receive the following:
          <br /><br />
          <ul>
            <li>5% of the total supply of Solon will be distributed randomly to Solon NFT holders (there will be a function users can call at any point after our audit to withdraw the amount of Solon associated with their NFT)</li>
            <li>Exclusive access to an actively managed liquidity pool controlled by the team&apos;s top researchers</li>
            <li>Exclusive access to Solon in-person events</li>
            <li>Exclusive access to the Solon Boule in the metaverse</li>
            <li>Founders status in our ecosystem (@Boule)</li>
          </ul>
        </Paragraph>
      </Section>

      <Section image="/blob3.png" flip>
        <Title>What is the price of a Solon NFT?</Title>
        <Paragraph>The price of a single Solon NFT will be 0.06 ETH + GAS. Each Solon NFT purchased after your initial purchase will be an additional 0.01 ETH on top of the base price (0.06 ETH + (0.01 ETH * your balance of Solon NFTs) + GAS).</Paragraph>
      </Section>

      <Animate>
        <Title>What are the funds from the NFT sale being used for?</Title>
        <Paragraph>Of the ~100 ETH the sale of Solon NFTs will raise we&apos;re using 50% of the funds for an audit of our smart contracts. We are hiring a top tier auditor to ensure there are no security flaws in our contracts, and to have a notable outside firm validate our code. 25% of the funds will be used for purchasing and developing a decentralized Solon market (NFTs, Pools, and Exchanges) in a metaverse along with the Solon Boule. The remaining 25% will be used to fund other development expenses. There will be a 2.5% fee on secondary market sales, which will be used to fund in person events. Any remaining funds will go to the Solon governance pool for the community to vote on how best to use. There will be consistent public reports on how the funds raised from the sale are spent and every expense will be detailed.</Paragraph>
      </Animate>

      <style jsx>{`
        .viewer {
          display: flex;
        }

        .viewer > * {
          flex-basis: 0;
          flex-grow: 1;
          min-width: 0;
        }

        .viewer-menu {
          display: flex;
          flex-direction: column;
        }

        li {
          background: url(/bullet.svg) no-repeat left top;
          padding: 4px 0px 0px 32px;
          list-style: none;
          transform: translate(-40px);
          text-align: left;
        }
      `}</style>
    </main>
  )
}

function Video({name}) {
  return (
    <>
      <video
        playsInline loop muted autoPlay
        src={"https://arweave.net/tTgxSCbD8Ws30IrW0BX-_uml3wDdSjYa0csu8W0BqPw/" + name + ".mp4"}
        poster={"https://arweave.net/riAF7gZb7uOdqIfvWm8xLORIej4c-CwI5RlYihCvseY/" + name + ".png"}
      />

      <style jsx>{`
        video {
          border-radius: 16px;
          width: 100%;
        }
      `}</style>
    </>
  )
}

function Menu({name, setName}) {
  const tiny = useMediaQuery({query: "(max-width: 440px)"})

  const includeDetails = name in nftData

  const length = (9 - name.length) * 5
  const solon = includeDetails ? nftData[name].solon : ""
  const [owner, setOwner] = useState("...")

  const { Moralis } = useMoralis()

  useEffect(async function() {
    const web3 = await Moralis.enable()
    const contract = new web3.eth.Contract(abi, "0xb65Cf1744C9D041B475d3781F498331eF769aD98")
    if (includeDetails) {
      setOwner(await contract.methods.ownerOf(nftData[name].tokenId).call())
    }
  })

  return (
    <>
      <div className="buttons">
        <Button text="&#5176;" empty style={{padding: "20px"}} onClick={() => {
          if (name.length > 1) {
            setName(name.slice(0, -1))
          }
        }} />

        <div className="neural-network">
          <Button text="Minimal" empty={name[0] !== "A"} onClick={() => {
            if (name[0] !== "A") {
              setName("A" + name.substring(1))
            }
          }} />

          <Spacer width="24px" height="24px" />

          <Button text="Landscapes" empty={name[0] !== "B"} onClick={() => {
            if (name[0] !== "B") {
              setName("B" + name.substring(1))
            }
          }} />
        </div>
      </div>

      <Title>{name}</Title>

      <Paragraph>
        {
          includeDetails ? (
            <>
              Length: {length} seconds
              <br />
              Solon: {solon} tokens
              <br />
              Owner: {owner}
            </>
          ) : "Details not currently available"
        }
      </Paragraph>

      <style jsx>{`
        .buttons {
          display: flex;
          justify-content: space-between;
        }

        .neural-network {
          display: flex;
          flex-direction: ${tiny ? "column" : "row"};
          align-items: flex-end;
        }
      `}</style>
    </>
  )
}

function Options({name, setName}) {
  const url = "https://arweave.net/riAF7gZb7uOdqIfvWm8xLORIej4c-CwI5RlYihCvseY/"
  return (
    <div className="container">
      <img src={url + name + "1.png"} onClick={() => {
        if (name.length < 8) {
          setName(name + "1")
        }
      }} />

      <Spacer width="24px" />

      <img src={url + name + "2.png"} onClick={() => {
        if (name.length < 8) {
          setName(name + "2")
        }
      }} />

      <Spacer width="24px" />

      <img src={url + name + "3.png"} onClick={() => {
        if (name.length < 8) {
          setName(name + "3")
        }
      }} />

      <style jsx>{`
        .container {
          display: ${name.length < 7 ? "flex" : "none"};
        }

        img {
          flex: 1;
          min-width: 0;
          object-fit: contain;
          border-radius: 16px;
          cursor: pointer;
          transition: transform 250ms;
        }

        img:hover {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  )
}

function Mint() {
  const { Moralis, isAuthenticated, user } = useMoralis()

  if (!isAuthenticated) {
    return (
      <>
        <div className="container">
          <center>
            <p>Connect your wallet to mint NFTs</p>
          </center>
        </div>

        <style jsx>{`
          .container {
            background: #151F2B;
            border-radius: 16px;
            padding: 24px;
          }

          p {
            opacity: 0.8;
          }
        `}</style>
      </>
    )
  }

  const [amount, setAmount] = useState("")
  const [amountMinted, setAmountMinted] = useState("...")
  const [totalSupply, setTotalSupply] = useState("...")

  useEffect(async () => {
    const web3 = await Moralis.enable()
    const contract = new web3.eth.Contract(abi, "0xb65Cf1744C9D041B475d3781F498331eF769aD98")
    setAmountMinted(parseInt(await contract.methods.amountMinted(user.get('ethAddress')).call()))
    setTotalSupply(parseInt(await contract.methods.totalSupply().call()))
  })

  const tiny = useMediaQuery({query: "(max-width: 440px)"})

  return (
    <>
      <Animate>
        <div className="container">
          <input type="number" placeholder="Amount" value={amount} onInput={e => setAmount(e.target.value)} />
          <Spacer width="24px" height="24px" />
          <Button text="Mint" onClick={async () => {
            const web3 = await Moralis.enable()
            const contract = new web3.eth.Contract(abi, "0xb65Cf1744C9D041B475d3781F498331eF769aD98")
            const amountMinted = parseInt(await contract.methods.amountMinted(user.get('ethAddress')).call())
            let value = 0
            for (let i = 0; i < amount; i++) {
              value += 60 + (amountMinted + i) * 10
            }
            value = web3.utils.toWei(value.toString(), "finney")
            await contract.methods.mint(amount)
              .send({from: user.get("ethAddress"), value: value})
              .then(receipt => {
                console.log(receipt);
                })
              .catch(error => {
                console.log(error);
              })
            }} />
          <Spacer width="24px" height="24px" />
          <div className="text">
            <p>You have minted {amountMinted}</p>
            <Spacer width="24px" height="24px" flexGrow="1" />
            <p>{totalSupply} / 2036 total</p>
          </div>
        </div>
      </Animate>

      <style jsx>{`
        .container {
          background: #151F2B;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-wrap: wrap;
          flex-direction: ${tiny ? "column" : "row"};
        }

        .text {
          display: flex;
          flex-grow: 1;
        }

        input {
          background: #151F2B;
          border: 2px solid white;
          border-radius: 32px;
          color: white;
          outline: none;
          text-align: center;
          -moz-appearance: textfield;
          height: 56px;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        p {
          opacity: 0.8;
        }
      `}</style>
    </>
  )
}
