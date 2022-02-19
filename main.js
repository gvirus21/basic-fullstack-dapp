let accounts;
let balance;

const connectWallet = async () => {
  console.log("connect wallet");

  if (window.ethereum) {
    try {
      accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (err) {
      console.log(err);
    }
  }

  console.log(accounts);
};

const checkEthBalance = async () => {
  if (window.ethereum) {
    try {
      balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
    } catch (err) {
      console.log(err);
    }

    console.log("Eth Balance", balance);
  }
};
