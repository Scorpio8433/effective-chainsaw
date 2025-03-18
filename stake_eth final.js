const { ExternalAddress, Coinbase, StakeOptionsMode } = require('coinbase-sdk'); // Make sure to install the Coinbase SDK if you haven't already

// Set your API key and secret
const API_KEY = 'YOUR_API_KEY_HERE';
const API_SECRET = 'YOUR_API_SECRET_HERE';

// Configure Coinbase SDK with your API key and secret
Coinbase.configure({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
});

async function stakeEthereum() {
    try {
        // Create an ExternalAddress object for Ethereum Holesky network with your MetaMask wallet address
        let address = new ExternalAddress(Coinbase.networks.EthereumHolesky, "YOUR_WALLET_ADDRESS_HERE");
        
        // Get the stakeable balance of Ethereum
        let stakeableBalance = await address.stakeableBalance(Coinbase.assets.Eth, StakeOptionsMode.NATIVE);
        console.log(`Stakeable Balance: ${stakeableBalance}`);
        
        // Build a staking operation for 64 ETH
        let stakingOperation = await address.buildStakeOperation(64, Coinbase.assets.Eth, StakeOptionsMode.NATIVE);
        console.log('Staking operation created...');
        
        // Wait for the staking operation to complete
        await stakingOperation.wait();
        console.log('Staking operation completed successfully.');
        
    } catch (error) {
        console.error('Error staking Ethereum:', error);
    }
}

// Call the function to stake Ethereum
stakeEthereum();
