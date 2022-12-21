// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract ecommerce {
    address public owner;
    uint256 id;

    constructor(){
        owner = msg.sender;
        id = 0;
    }

    struct product {
        uint256 productId;
        string productName;
        address seller;
        address buyer;
        uint256 price;
    }
     event productBought (
        uint256 productId,
        string productName,
        address seller,
        address buyer,
        uint256 price
     );




    mapping(address => product) public AllProducts;


    function buyItem (address _seller, address _buyer, uint256 _price, string memory _product) public payable{
        require(msg.value == _price , "Something went wrong");
        product storage newProduct = AllProducts[_buyer];
        newProduct.productId = id;
        newProduct.productName = _product;
        newProduct.seller = _seller;
        newProduct.buyer = _buyer;
        newProduct.price = _price;

        id++;
        emit productBought(id,_product,_seller,_buyer,_price);
        payable(_seller).transfer(_price*90/100);
        payable(owner).transfer(_price*10/100);
    }

}