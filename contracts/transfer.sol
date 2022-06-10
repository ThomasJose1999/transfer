pragma solidity >=0.7.0 <0.9.0;

contract transfer{
    address owner;
    
    constructor () public {
        owner = msg.sender;
    }

    function sendMoney(address payable addr, uint256 value) public payable {
        require (value < address(this).balance, "contract doesn't have enough balance");
        addr.transfer(value);
    }

    receive() external payable { }

    function balanceOfContract () public view returns(uint256){
        return address(this).balance;
    }
}