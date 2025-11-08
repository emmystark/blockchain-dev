const SHA256 = require('crypto-js/sha256');


class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "08/11/2025", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }   
}

let starkCoin = new Blockchain();
starkCoin.addBlock(new Block(1, "08/11/2025", { amount: 4 }));
starkCoin.addBlock(new Block(2, "08/11/2025", { amount: 10 }));

console.log('Is blockchain valid? ' + starkCoin.isChainValid());

starkCoin.chain[1].data = { amount: 100 };
starkCoin.chain[1].hash = starkCoin.chain[1].calculateHash();

console.log('Is blockchain valid? ' + starkCoin.isChainValid());

console.log(JSON.stringify(starkCoin, null, 4));