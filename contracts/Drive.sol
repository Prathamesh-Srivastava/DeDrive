// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Drive{
    struct Access{
        address user;
        bool flag;
    }

    mapping (address => string[]) files;
    mapping (address => Access[]) accessList;
    mapping (address => mapping (address=> bool)) ownerShip;
    mapping (address => mapping (address=> bool)) pastAccess;

    function add(address _user, string calldata _url) external {
        files[_user].push(_url);
    }

    function allow(address _user) external {
        ownerShip[msg.sender][_user] = true;
        if(pastAccess[msg.sender][_user] == true){
            for(uint i=0;i<accessList[msg.sender].length;i++){
                if(accessList[msg.sender][i].user == _user){
                    accessList[msg.sender][i].flag = true;
                    break ;
                }
            }
        }
        else{
            accessList[msg.sender].push(Access(_user,true));
            pastAccess[msg.sender][_user] = true;
        }
    }


    function disAllow(address _user) external {
        ownerShip[msg.sender][_user] = false;
        for(uint i=0;i<accessList[msg.sender].length;i++){
            if(accessList[msg.sender][i].user == _user){
                accessList[msg.sender][i].flag = false;
                break;
            }
        }
    }


    function display(address _user) external view returns (string [] memory) {
        require(_user==msg.sender || ownerShip[_user][msg.sender]==true, "You don't have access");
        return files[_user];
    }

    function viewAccess () public view returns (Access [] memory) {
        return accessList[msg.sender];
    }
}
