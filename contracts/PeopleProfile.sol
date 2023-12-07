// The version of solidity we are compiling on >= 0.8.8
//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Initializing the contract
contract PeopleProfile {
   uint256 age;

    struct Person {
        uint256 age;
        string name;
    }

    Person[] public people;
    mapping(string => uint256) public nameToAge;

    function store (uint256 _age) public {
        age = _age;
    }

    function retrieve() public view returns (uint256){
        return age;
    }

    function addPerson(string memory _name, uint256 _age) public {
        people.push(Person(_age, _name));
        nameToAge[_name] = _age;
    }
}