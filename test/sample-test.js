const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transfer Contract", function () {
  let Transfer, transfer, owner, addr1, addr2;

  beforeEach(async () =>{
    Transfer = await ethers.getContractFactory("transfer");
    transfer = await Transfer.deploy();
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("Deployment", ()=>{
    it("should send ethers to the contract", async ()=>{
      // const provider = waffle.provider;
      expect(await transfer.balanceOfContract()).to.equal(0);

      await addr1.sendTransaction({
        to: transfer.address,
        value: 100,
        
      });
      expect(await transfer.balanceOfContract()).to.equal(100);
    });

    it("should recieve ethers from contract", async ()=>{
      const provider = waffle.provider;
      await addr1.sendTransaction({
        to: transfer.address,
        value: ethers.utils.parseEther("10.0"),
        
      });

      let contractBal =  parseInt(await transfer.balanceOfContract());
      let addr2Bal = parseInt(await provider.getBalance(addr2.address));
      await transfer.sendMoney(addr2.address, 100);
      let newBal = parseInt(await provider.getBalance(addr2.address));
      expect(newBal).to.equal(addr2Bal+100);
      let newContractBal = parseInt(await transfer.balanceOfContract());
      expect(newContractBal).to.lessThanOrEqual(contractBal);

    });


  });



});
