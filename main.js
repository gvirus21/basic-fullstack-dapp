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

    // converting hexadecimal value wei to Eth
    balance = parseInt(balance);
    balance = balance / Math.pow(10, 18);

    console.log("Eth Balance", balance);
  }
};

const handleAccountChanged = (_accounts) => {
    console.log("Accounts Changed");
    accounts = _accounts
};

if (window.ethereum) {
  window.ethereum.on("accountsChanged", handleAccountChanged);
}
