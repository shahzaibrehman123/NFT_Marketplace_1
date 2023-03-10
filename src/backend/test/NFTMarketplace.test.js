const {expect} = require("chai");

describe("NFTMarketplace", function(){

    let deployer , addr1 , addr2 , nft , marketplace
    let feePercent = 1
    let URI = "SAMPLE URI"
    beforeEach(async function(){

        //get contract factories

    const NFT = await ethers.getContractFactory("NFT");
    const Marketplace = await ethers.getContractFactory("Marketplace");
    [deployer , addr1 , addr2] = await ethers.getSigners()

    //DEPLOY

    nft = await NFT.deploy();
    marketplace = await Marketplace.deploy(feePercent);

    });

    describe("Deployment", function(){
        it("Should track name and symbol of the nft collection", async function(){
            expect(await nft.name()).to.equal("Cybernest NFT")
            expect(await nft.symbol()).to.equal("DAPP")
        });
        it("Should track feeAccount and feePercent of the marketplace", async function(){
            expect(await marketplace.feeAccount()).to.equal(deployer.address)
            expect(await marketplace.feePercent()).to.equal(feePercent)
        });
    })

    describe("Minting NFT", function(){
        it("Should track each minted NFT", async function(){

         // addr1 mints an NFT
        await nft.connect(addr1).mint(URI)
        expect(await nft.tokenCount()).to.equal(1);
        expect(await nft.balanceOf(addr1.address)).to.equal(1);
        expect(await nft.tokenURI(1)).to.equal(URI);

        // addr2 mints an NFT
        await nft.connect(addr2).mint(URI)
        expect(await nft.tokenCount()).to.equal(2);
        expect(await nft.balanceOf(addr2.address)).to.equal(1);
        expect(await nft.tokenURI(2)).to.equal(URI);

        })
       

    });

    

})