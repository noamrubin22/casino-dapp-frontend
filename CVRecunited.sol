// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.3/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.3/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.8.3/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@4.8.3/access/Ownable.sol";
import "@openzeppelin/contracts@4.8.3/utils/Counters.sol";

contract RecunitedCV is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // var burnAddress = 0x000000000000000000000000000000000000dEaD;

    constructor() ERC721("RecunitedCV", "REC") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        // require(this.balanceOf(to) == 0, "You already minted your NFT.");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256, //firstTokenId,
        uint256 //batchSize
    ) internal override virtual {
      require(to == address(0) || from == address(0) || from == owner() || to == address(this.burnAddress), "You can't transfer this NFT");
    }


    function _updateBurnAddress(address newBurnAddress) internal onlyOwner {
        this.burnAddress = newBurnAddress;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        // can only be burned by NFT holder
        require(ownerOf(tokenId) == _msgSender(), "SoulboundNFT: token is not owned by the caller");
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
