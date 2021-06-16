export let nwConfig = {
  42: {
    name: "Kovan",
    chainId: 42,
    color: "purple",
    prefix: "https://kovan.etherscan.io/tx/",
    factoryAddress: "0xa7CD2F79F9aebc0E0fe9bd33Ebf3ce9bD1eBE20c",
    addressBookAddr: "0x8812f219f507e8cfe9d2f1e790164714c5e06a73",
    controllerAddress: "0xdee7d0f8ccc0f7ac7e45af454e5e7ec1552e8e4e",
    aTokenAddrs: [
      {
        key: "1",
        text: "WBTC : 0xe0C9275E44Ea80eF17579d33c55136b7DA269aEb",
        value: "0xe0C9275E44Ea80eF17579d33c55136b7DA269aEb",
      },
      {
        key: "2",
        text: "WETH : 0xd0a1e359811322d97991e03f863a0c30c2cf029c",
        value: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
      },
    ],
  },
  3: {
    name: "Ropsten",
    chainId: 3,
    color: "pink",
    prefix: "https://ropsten.etherscan.io/tx/",
    factoryAddress: "0xa7CD2F79F9aebc0E0fe9bd33Ebf3ce9bD1eBE20c",
    addressBookAddr: "0x8812f219f507e8cfe9d2f1e790164714c5e06a73",
    controllerAddress: "0xdea7d0f8ccc0f7ac7e45af454e5e7ec1552e8e4e",
    aTokenAddrs: [
      {
        key: "1",
        text: "WBTC : 0xa0C9275E44Ea80eF17579d33c55136b7DA269aEb",
        value: "0xa0C9275E44Ea80eF17579d33c55136b7DA269aEb",
      },
      {
        key: "2",
        text: "WETH : 0xd0a1e359811322d97991e03f863a0c30c2cf029c",
        value: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
      },
    ],
  },
};

export let currentChain = 42;

export function setChain(c) {
  currentChain = c;
}
