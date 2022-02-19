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
  accounts = _accounts;
};

if (window.ethereum) {
  window.ethereum.on("accountsChanged", handleAccountChanged);

  window.ethereum
    .request({ method: "eth_accounts" })
    .then(handleAccountChanged)
    .catch((err) => {
      console.log(err);
    });
}

const sendTransaction = async () => {
  try {
    let result = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0],
          to: "0x6b2Fc28Cd52d71cDaE8FE4FFF13d625BDb760730",
          gas: Number(21000).toString(16),
          gasPrice: Number(2500000).toString(16),
          value: Number(1000000000000000000).toString(16),
        },
      ],
    });
  } catch (err) {
    console.log(err);
    }
    

};
