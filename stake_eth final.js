const { ExternalAddress, Coinbase, StakeOptionsMode } = require('coinbase-sdk'); // Make sure to install the Coinbase SDK if you haven't already

// Set your API key and secret
const API_KEY = '382c5e1a-c509-41b2-a168-cc95097731d6';
const API_SECRET = `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINabO5xnjazAdxwl72PhBJhC9qdlAbnhJG1yhDULPX0QoAoGCCqGSM49
AwEHoUQDQgAEwjaLljvTQR6/H3eTfeoRUHHtFEtmTlj6jD9F+ueo5qrJh4wPkDaT
mdyaXTt4kOfiCm5LFs+4Vf50deW5zT6YNw==
-----END EC PRIVATE KEY-----`;

// Configure Coinbase SDK with your API key and secret
Coinbase.configure({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
});

async function stakeEthereum() {
    try {
        // Create an ExternalAddress object for Ethereum Holesky network with your MetaMask wallet address
        let address = new ExternalAddress(Coinbase.networks.EthereumHolesky, "0x594e8de27f320A7C51166389Db34F9D3c7ef0492");
        
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