let accounts;

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
    
    console.log(accounts)
};
