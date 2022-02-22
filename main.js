let accounts;
let balance;

//ERC20 address
const libcAddress = "0x4a99d5183fd1d5ffbd1cc32492cd43686c01e945";

//Abi
const libcABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];

let provider;

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

  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  alert("Please install Metamask");
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

const checkTokenBalance = async () => {
  const libcContract = new ethers.Contract(libcAddress, libcABI, provider);
  const balance = await libcContract.balanceOf(accounts[0]);
  console.log(balance.toString());
};

const transferToken = async () => {
  const signer = provider.getSigner();
  const libcContract = new ethers.Contract(libcAddress, libcABI, signer);

  const amount = ethers.utils.parseUnits("1.0", 18);

  let tx = libcContract.transfer(
    "0x4B1865B7786c517B2dfe6f8C4727320FF5178e6c",
    amount
  );
  console.log("tx: ", tx);
  checkEvents()
};

const checkEvents = () => {
  let libcContract = new ethers.Contract(libcAddress, libcABI, provider);

  libcContract.on("Transfer", (from, to, amount) => {
    console.log("Got the event")
    console.log(from)
    console.log(to)
    console.log(amount)
  })
}