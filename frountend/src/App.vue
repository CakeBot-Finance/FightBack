<template>
  <div
    id="app"
    class="rpgui-content rpgui-cursor-default"
    style="overflow-y: scroll; overflow-x: scroll"
  >
    <div id="main"></div>
    <div class="inner rpgui-container framed" style="position: relative">
      <header style="padding-top: 5px">
        <h1 style="font-size: 250%; line-height: 45px" class="title">
          <img
            src="./assets/logo_sword.svg"
            style="
              width: 70px;
              bottom: -15px;
              position: relative;
              top: 23px;
              transform: scaleX(-1);
            "
          />Zero Day Fightback<img
            src="./assets/logo_sword.svg"
            style="width: 70px; bottom: -15px; position: relative; top: 23px"
          />
        </h1>
        <h2 style="font-size: 175%">Fully On-Chain SVG NFTs</h2>
      </header>

      <br />
      <p>
        &nbsp;&nbsp;FightBack is a Game-Universe with the style of Dungeons &
        Dragons where NFT characters can cross in multiple block chains. All
        parts are generated randomly and stored on chains. We make the effort to
        integrate parallel chains through our project &
        <a href="https://layerzero.network/">@LayerZero_Labs</a>, let user's
        values or ideas break barriers between chains and flow freely!
      </p>
      <br />
      <hr style="clear: both" />
      <br />

      <div id="mint">
        <h1 style="font-size: 175%">
          <span style="font-size: 120%">🔨</span
          ><span style="font-size: 50%">&nbsp;</span>Mint
        </h1>
        <ul>
          <li>
            <a href="#"><span class="fire">⚔️</span> Total Supply: 4444</a>
          </li>
          <li>
            <a href="#"
              ><span class="fire">💳</span
              >{{ ` Price: ${app_config.DISPLAY_COST} eth` }}</a
            >
          </li>
          <li>
            <a href="#"><span class="fire">🎫</span> Limit: 5 nfts per tx</a>
          </li>
        </ul>
        <br />

        <div
          id="cursors"
          class="rpgui-container framed-grey rpgui-center network"
        >
          <h1>Select your network</h1>
          <h4 style="color: #f98b8b">
            {{ `${truncate(currentAccount, 22)}` }}
          </h4>
          <h2 style="color: #f98b8b">
            {{ ` Current network: ${currentNetworkName}` }}
          </h2>
          <hr />
          <button type="button" class="rpgui-button rpgui-cursor-point down">
            <p>Arbitrum</p>
          </button>
          <button type="button" class="rpgui-button" disabled>
            <p>Optimism</p>
          </button>
          <br class="mobile" />
          <button type="button" class="rpgui-button" disabled>
            <p>Matic</p>
          </button>
          <button type="button" class="rpgui-button" disabled>
            <p>Ethereum</p>
          </button>

          <br />
          <div style="clear: both" />
          <br />

          <!--  error mesage  -->
          <br />
          <div
            v-if="error_message"
            class="rpgui-container framed-grey"
            style="position: relative; width: 86%; display: inline-block"
          >
            <h2 style="color: #f98b8b">
              {{ `${error_message}` }}
              <br />
              <!-- <a href="http://www.opensea.io" target="_blank">view your nfts</a> -->
            </h2>
          </div>

          <div v-if="error_message">
            <br />
          </div>

          <!--amount-->
          <div v-if="true">
            <p
              style="
                display: inline-block;
                vertical-align: middle;
                line-height: 40px;
                margin-right: 10px;
                margin-bottom: 0px;
                margin-top: 8px;
                vertical-align: top;
              "
            >
              Left: {{ Left_CurrentChain }} / {{ MaxMint_CurrentChain }}
            </p>
            <div style="width: 40%; min-width: 300px; display: inline-block">
              <div style="width: 40%; min-width: 300px; display: inline-block">
                <div
                  id="hp-bar"
                  data-value="0.5"
                  style="
                    height: 42px;
                    width: 100%;
                    margin-top: 5px;
                    margin-bottom: 5px;
                    position: relative;
                  "
                >
                  <div class="rpgui-progress-track">
                    <div
                      class="rpgui-progress-fill red"
                      style="left: 0px"
                      v-bind:style="{
                        left: '0px',
                        width: `${(
                          (Left_CurrentChain / MaxMint_CurrentChain) *
                          100
                        ).toFixed(2)}%`,
                      }"
                    ></div>
                  </div>
                  <div class="rpgui-progress-left-edge"></div>
                  <div class="rpgui-progress-right-edge"></div>
                </div>

                <!-- <div id="hp-bar" data-value="0.4" class="rpgui-progress red"></div> -->
              </div>
            </div>
          </div>

          <p style="display: inline-block">Mint amounts: (1~5)</p>
          <div class="radio-amount" style="display: inline-block">
            <div v-for="amount in amountList" :key="amount">
              <input
                class="rpgui-radio"
                type="radio"
                :value="amount"
                v-model="defaultMintAmount"
              /><label>{{ amount }}</label>
            </div>
          </div>

          <div clear="both" />
          <br />

          <!--Mint button-->
          <div class="rpgui-center" v-if="currentAccount">
            <a
              ><button
                type="button"
                class="rpgui-button"
                v-on:click="mint"
                :disabled="isMinting"
                style="width: 250px"
              >
                <p>
                  {{ isMinting ? "Minting..." : "Mint" }}
                </p>
              </button></a
            >
          </div>

          <div class="rpgui-center" v-if="!currentAccount">
            <a
              ><button
                type="button"
                v-on:click="connectWallet(false)"
                class="rpgui-button"
                style="width: 250px"
              >
                <p>connect wallet</p>
              </button></a
            >
          </div>
        </div>
        <br />
        <hr style="clear: both" />
        <br />

        <!-- My wallet-->
        <div
          id="containers"
          class="rpgui-container framed-grey story"
          style="width: 100%"
          v-if="myWallet && myWallet.length > 0"
        >
          <h1 style="font-size: 175%">
            <span style="font-size: 125%">💰</span
            ><span style="font-size: 50%">&nbsp;</span>My Wallet
          </h1>
          <br />
          <!--NFT List-->
          <div
            v-for="item in myWallet"
            :key="item.id"
            class="rpgui-container framed nft-preview"
            style="position: relative; display: inline-block"
          >
            <img :src="item.URI.image" />
            <p style="text-align: center; margin-top: 6px">
              <img
                style="width: 18px; vertical-align: top; margin-right: 8px"
                src="./assets/arbitrum.png"
              />
              <span style="text-align: center">{{
                "#" + item.URI.name.split("#")[1]
              }}</span>
            </p>
          </div>

          <br /><br />
        </div>

        <!--  Story  -->
        <div
          id="containers"
          class="rpgui-container framed-grey story"
          style="width: 100%"
        >
          <h1 style="font-size: 175%">
            <span style="font-size: 120%">📜</span
            ><span style="font-size: 50%">&nbsp;</span>Story
          </h1>
          <!--infomation-->
          <img
            src="./assets/sneakpeek.svg"
            align="left"
            width="30%"
            style="
              margin-right: 20px;
              border-radius: 5px;
              border: 2px solid #d27d2c;
            "
          />
          <p>
            &nbsp;&nbsp;A long time ago, the pioneers traveled to many wonderful
            worlds from the great Ethereum world, through the fog-shrouded
            memory pool. Now, we fantasize about traveling through alternate
            universes, traversing Arbitrum and Optimism, freely and admiring the
            majestic landscapes of Matic and Avalanche. However, the fate from
            another dimension has erected barriers between the various public
            chains, and the danger and fragility of cross-chain bridges have
            also discouraged travelers. Therefore, those brave explorers who
            were exiled to Layer2 decided to resist the arrangement of fate and
            wanted to find the Holy Grail that can cross-chains freely, so that
            they could return to Layer 1 to fight back against fate. Yes they
            did, because of
            <a href="https://layerzero.network/">@LayerZero_Labs</a>. Let's
            recruit heroes from the Layer2 to break through the barriers and
            Fightback to L1 !
          </p>
          <div style="clear: both" />

          <hr />
          <!--Classes-->
          <div
            class="rpgui-container framed story"
            style="position: relative; height: 420px; display: inline-block"
          >
            <p>Classes:<br /></p>
            <ul>
              <li v-for="item in game.Classes" :key="item">
                <a>{{ item }}</a>
              </li>
            </ul>
          </div>

          <!--Races-->
          <div
            class="rpgui-container framed story story2"
            style="position: relative; height: 420px; display: inline-block"
          >
            <p>Races:<br /></p>
            <ul>
              <li v-for="item in game.Races" :key="item">
                <a>{{ item }}</a>
              </li>
            </ul>
          </div>

          <!--Alignments-->
          <div
            class="rpgui-container framed story story3"
            style="position: relative; height: 300px; display: inline-block"
          >
            <p>Alignments:<br /></p>
            <ul>
              <li v-for="item in game.Alignments" :key="item">
                <a>{{ item }}</a>
              </li>
            </ul>
          </div>

          <br /><br />
          <div
            class="rpgui-container framed-grey"
            style="
              position: relative;
              width: 100%;
              height: 300px;
              display: inline-block;
              border-width: 0px;
            "
          >
            <h1 style="font-size: 175%">
              <span style="font-size: 120%">⏳</span
              ><span style="font-size: 50%">&nbsp;</span>Roadmap
            </h1>
            <div id="icons" class="rpgui-container framed-grey timeline">
              <div
                class="rpgui-icon sword"
                style="width: 30px; height: 30px"
              ></div>
              <p style="display: inline-block; font-size: 150%">
                Hero Recruitment
              </p>
              <p>
                The total planned of recruiting is 4444, It also means that our
                total number of NFTs is only 4444. We will recruit the first
                resistance army on Arbitrum, and there are the main force here,
                planned to provide 2000 NFTs for minting on Arbitrum. When the
                minting is completed, we will open the portal connected to the
                parachains, establish an alliance channel with Optimism, and
                provide 1000 NFTs for minting on Optimism, and conduct random
                airdrops to users who mint NFTs on Arbitrum.
              </p>

              <br />
              <div
                class="rpgui-icon potion-red"
                style="width: 30px; height: 30px"
              ></div>
              <p style="display: inline-block">Launch the Fightback</p>
              <p>
                When the heroes of L2 are recruited, we will gather the elite
                troops from the two chains and launch the Fightback against L1!
                We will establish a portal with L1 and provide 1000 NFTs for
                Minting on Ethereum. At the same time, random airdrops are made
                to users who mint NFTs on Arbitrum and Optimism.
              </p>

              <br />
              <div
                class="rpgui-icon potion-green"
                style="width: 30px; height: 30px"
              ></div>
              <p style="display: inline-block">Guard the Camp</p>
              <p>
                When we break the wall of fate and reclaim the promised land, we
                will send the remaining 444 NFTs (Not for sell) to each chain as
                messengers, open up transmission channels on multiple chains,
                and build a free cross-chain Game-Universe. This 444 NFTs is
                reserved for the community and will not be sold externally,will
                be used as a community reward to builders, active participants.
              </p>

              <br />
              <div
                class="rpgui-icon potion-blue"
                style="width: 30px; height: 30px"
              ></div>
              <p style="display: inline-block">Rebuild the Homeland</p>
              <p>
                Now, our NFTs can cross multiple chains freely. We will
                committed to creating a DAO that achieves the same democratic
                freedom in different on-chain spaces. But just as the different
                planets have different environments and climates, different
                chains also have different value orientations. We will unite
                community forces to build a creative and financial platform on
                Ethereum, an efficient trading platform on L2, and unique
                applications on chains such as Matic, BSC, and Avalanche. Share
                development results with our community , share the revenue of
                apps and protocols, airdrop equipment or game tokens to NFT
                holders!
              </p>
            </div>

            <br />
          </div>
        </div>

        <!-- bottom -->
        <br />
        <div class="rpgui-center">
          <h1 style="font-size: 150%">Fighting!</h1>
          <!-- <p>
            Check out our
            <a href="https://twitter.com/0DayProject">Twitter</a> for more info!
          </p>
           -->
          <a target="_blank" href="https://twitter.com/0DayProject"
            >- Twitter -</a
          >
          <br />
          <br />
          <a target="_blank" href="https://github.com/0DayProject"
            >- Github -</a
          >
          <!-- <br />
          <br />
          <a href="https://discord.com">- Discord -</a> -->
          <br />
          <br />
          <a href="#main">- Back to Top -</a>
          <br />
          <img
            src="./assets/logo_sword.svg"
            style="
              position: absolute;
              display: inline-block;
              width: 70px;
              right: 0px;
              bottom: -15px;
            "
          />
          <img
            src="./assets/logo_sword.svg"
            style="
              position: absolute;
              display: inline-block;
              width: 70px;
              left: 0px;
              bottom: -15px;
              transform: scaleX(-1);
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import config from "../config.json";
import gameData from "../data.json";
import RPGUI from "./rpgui.js";

export default {
  name: "App",
  data() {
    return {
      send_to_terminal: "",
      error_message: "",
      currentAccount: "", // 当前钱包地址
      zeroContract: null, // 合约实例
      zeroViewerContract: null, // Viewer合约实例
      app_config: config,
      provider: null,
      currentNetwork: "N/A", //当前网络
      isMinting: false,
      game: gameData,
      amountList: [1, 2, 3, 4, 5],
      defaultMintAmount: 1,
      Left_CurrentChain: 1,
      myNFTs: [],
      myWallet: [],
      MaxMint_CurrentChain: config.MAX_AMOUNT_CURRENT_CHAIN,
    };
  },
  methods: {
    prompt(value) {
      return `${value}> `;
    },
    truncate: function (fullStr, strLen, separator) {
      if (!fullStr || fullStr.length <= strLen) return fullStr;

      separator = separator || "...";

      var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow / 2),
        backChars = Math.floor(charsToShow / 2);

      return (
        fullStr.substr(0, frontChars) +
        separator +
        fullStr.substr(fullStr.length - backChars)
      );
    },
    // wallet related
    connectWallet: async function (silent) {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          this.error_message = "Pls install MetaMask first...";
          return;
        }

        this.provider = new this.$ethers.providers.Web3Provider(
          window.ethereum
        );

        window.ethereum.on("accountsChanged", async (accounts) => {
          this.currentAccount = accounts[0];
          await this.init_contract();
          await this.listMyNfts();
        });

        window.ethereum.on("networkChanged", async (networkId) => {
          // this.currentAccount = accounts[0];
          this.currentNetwork = this.app_config.CHAINID_MAP[networkId];
          this.error_message = "";
          await this.init_contract();
          // await this.listMyNfts();
        });

        if (silent && !ethereum.selectedAddress) {
          return;
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);
        this.currentAccount = accounts[0];

        const { chainId } = await this.provider.getNetwork();
        this.currentNetwork = this.app_config.CHAINID_MAP[chainId];

        this.switchNetwork();

        await this.init_contract();
        await this.getMyNft();
        await this.updateAmount();
        await this.listMyNfts();
      } catch (error) {
        console.log(error);
      }
    },
    updateAmount: async function () {
      try {
        // let maxAmount = this.app_config.MAX_AMOUNT_CURRENT_CHAIN;
        let endTokenId = await this.zeroContract.MAX_MINT();
        let nextTokenId = await this.zeroContract.nextTokenId();

        // console.log(`nextTokenId: ${nextTokenId}; maxAmount: ${endTokenId}`);

        // this.MaxMint_CurrentChain = maxAmount;
        this.Left_CurrentChain = endTokenId - nextTokenId;
      } catch (error) {
        // console.log(error);
        // this.MaxMint_CurrentChain = 1000;
        this.Left_CurrentChain = 1;
      }
    },
    getMyNft: async function () {
      // let balance = await this.zeroContract.balanceOf(this.currentAccount);
      // console.log(`${this.currentAccount} has ${balance} NFT`);
    },
    switchNetwork: async function () {
      const { chainId } = await this.provider.getNetwork();
      const targetChainIdHex = "0x" + this.app_config.NETWORK.ID.toString(16);
      if (chainId === this.app_config.NETWORK.ID) {
        return;
      }
      try {
        // check if the chain to connect to is installed
        console.log("try switch to ...");
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: targetChainIdHex }], // chainId must be in hexadecimal numbers
        });
        console.log("" + this.app_config.NETWORK.NAME + " connected");
        this.currentNetwork =
          this.app_config.CHAINID_MAP[this.app_config.NETWORK.ID];
        this.error_message = "";
        await this.init_contract();
        await this.updateAmount();
      } catch (error) {
        if (error.code === 4001) {
          //user cancel
          return;
        }
        // alert(JSON.stringify(error));
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        // error.code === 4902
        if (true) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainName: this.app_config.NETWORK.NAME,
                  // chainId: this.$ethers.utils.hexlify(
                  //   this.app_config.NETWORK.ID
                  // ),
                  nativeCurrency: {
                    name: this.app_config.NETWORK.SYMBOL,
                    symbol: this.app_config.NETWORK.SYMBOL, // 2-6 characters long
                    decimals: 18,
                  },
                  chainId: targetChainIdHex,
                  rpcUrls: [this.app_config.NETWORK.RPC],
                  blockExplorerUrls: [this.app_config.NETWORK.BLOCKEXPLORER],
                },
              ],
            });
            console.log("" + this.app_config.NETWORK.NAME + " connected");
            this.currentNetwork =
              this.app_config.CHAINID_MAP[this.app_config.NETWORK.ID];
            await this.init_contract();
            await this.updateAmount();
          } catch (addError) {
            // alert(JSON.stringify(addError));
            // console.log("wallet_addEthereumChain error");
            console.error(addError);
          }
        }
        console.error(error);
      }
    },
    mint: async function () {
      await this.switchNetwork();
      this.isMinting = true;
      this.error_message = "";

      const { chainId } = await this.provider.getNetwork();
      console.log("Mint: networkid ", chainId);
      if (chainId != this.app_config.NETWORK.ID) {
        this.error_message = "Pls switch to " + this.app_config.NETWORK.NAME;
        this.isMinting = false;
        return;
      }
      // setTimeout(() => {
      //   that.isMinting = false;
      //   that.error_message = "something wrong with minting, try again later";
      // }, 1000);
      // try {
      // } catch (error) {
      //   this.error_message = "something wrong with minting, try again later";
      // }
      try {
        let mintPirce = this.$ethers.utils.parseEther(
          (this.app_config.DISPLAY_COST * this.defaultMintAmount).toString()
        );
        mintPirce = mintPirce;
        let gasLimitNum = this.$ethers.utils.parseUnits(
          this.app_config.GAS_LIMIT,
          "gwei"
        );
        // console.log(mintPirce);
        // let options = { gasLimit: this.app_config.GAS_LIMIT, value: mintPirce };
        let options = { value: mintPirce };
        let mint_tx = await this.zeroContract.mint(
          1 * this.defaultMintAmount,
          options
        );
        this.error_message =
          "transaction has been sent, waiting for confirmation...";
        let result = await mint_tx.wait();
        // console.log(result);
        this.isMinting = false;
        this.error_message = "Congratulations, You have minted successfully!";

        await this.updateAmount();
      } catch (error) {
        console.log(error);
        this.isMinting = false;

        if (error.code === 4001) {
          this.error_message = "User cancelled...";
        } else {
          this.error_message = "something wrong with minting, try again later!";
        }
      }
    },
    init_contract: async function () {
      this.provider = new this.$ethers.providers.Web3Provider(window.ethereum);
      const { CONTRACT_ADDRESS, CONTRACT_VIEWER_ADDRESS, ABI } =
        this.app_config;
      const signer = this.provider.getSigner();

      // zero contract instance
      this.zeroContract = new this.$ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );

      // zero view contract instance
      this.zeroViewerContract = new this.$ethers.Contract(
        CONTRACT_VIEWER_ADDRESS,
        ABI,
        signer
      );
    },
    estimateCrossChainFee: async function (chainId, tokenId) {
      const gasLimit = await this.zeroContract.estimateFeesView(
        chainId,
        tokenId
      );
      return gasLimit;
    },

    listMyNfts: async function () {
      const startId = 5000;
      const endId = 6000;
      const step = 1000;
      let result = [];
      // console.log("fetching my nfts...")
      try {
        for (let i = startId / step; i < endId / step; i++) {
          const nfts = await this.zeroViewerContract.GetYours(
            i * step,
            (i + 1) * step
          );
          result = result.concat(nfts);
        }
        let tokenIds = result
          .map((x) => x.toNumber())
          .filter((item) => item > 0);
        console.log(tokenIds);

        // let tokenURIs = tokenIds.map(async (tokenId) => {
        //   let uri = await this.zeroContract.tokenURI(tokenId);
        //   return { tokenId, uri };
        // });

        let tokenURIs = [];
        for (let index = 0; index < tokenIds.length; index++) {
          console.log(index);
          let tokenId = tokenIds[index];
          let dataURI = await this.zeroContract.tokenURI(tokenId);
          const response = await fetch(dataURI);
          let nftJsonObj = await response.json();
          // console.log(nftJsonObj);
          tokenURIs.push({ id: tokenId, URI: nftJsonObj });
        }
        // tokenIds.forEach(async (tokenId) => {
        //   console.log(tokenId);
        //   let uri = await this.zeroContract.tokenURI(tokenId).toString();
        //   console.log(uri);
        //   let nftObj = JSON.parse(uri);
        //   tokenURIs.push({ id: tokenId, URI: nftObj });
        // });

        this.myWallet = tokenURIs;

        console.log(this.myWallet);
      } catch (error) {
        this.myWallet = [];
        console.log(error);
      }
    },
  },
  computed: {
    currentNetworkName: function () {
      if (this.currentNetwork) {
        return this.currentNetwork;
      } else return "N/A";
    },
  },
  mounted() {
    // rpg.init();
    // const plugin = document.createElement("script");
    // plugin.setAttribute(
    //   "src",
    //   "https://ronenness.github.io/RPGUI/rpgui/rpgui.min.js"
    // );
    // plugin.async = true;
    // document.head.appendChild(plugin);
    this.connectWallet(true);
  },
};
</script>

<style>
@import "./assets/print.css";
@import "../node_modules/rpgui/rpgui.css";
/* .rpgui-container {
  height: 540px;
  width: 280px;
} */

@font-face {
  font-family: "Chivo";
  src: local("Chivo"), url(./assets/Chivo.woff2) format("woff2");
}

body,
#app {
  background: #222;
  padding-top: 20px;
  padding-bottom: 20px;
}

.inner {
  background: #444;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 900px;
  /* width:750px; */
  /* min-width: 700px;
  max-width: 900px; */
  margin: 0 auto;
}

.rpgui-button p {
  margin: 10px 0px;
}

.fire {
  font-size: 1.2em !important;
}

.radio-amount label {
  margin-left: 10px;
}

.radio-amount div {
  display: inline-block;
}

.network button {
  width: 25%;
}

.timeline p {
  /* margin-left: 10px;
  line-height: 35px; */
  margin-left: 8px;
  vertical-align: middle;
}

.story {
  min-width: 350px;
  vertical-align: top;
  width: 48.5%;
}

.story2 {
  margin-left: 20px;
}

.story3 {
  margin-top: 10px;
  width: 100%;
}

.mobile {
  display: none;
}

.network button {
  min-width: 170px;
}

.nft-preview {
  margin-left: 8px;
  margin-top: 8px;
  width: 32%;
}

.nft-preview p {
  margin-bottom: 0px;
}

@media screen and (max-width: 830px) {
  .network button {
    min-width: 170px;
    margin: 5px;
  }

  .title img {
    display: none;
  }

  .story {
    min-width: 290px;
    vertical-align: top;
    width: 98%;
  }

  .story2 {
    margin-left: 0px;
    margin-top: 10px;
  }

  .story3 {
    margin-top: 10px;
  }

  .mobile {
    display: block;
  }

  .nft-preview {
    margin-left: 10px;
    margin-top: 8px;
    width: 48%;
  }
}

@media screen and (max-width: 610px) {
  .nft-preview {
    margin-top: 12px;
    left: 15%;
    width: 70%;
  }
}

/* Override */
.rpgui-button:disabled {
  pointer-events: none !important;
}
</style>
