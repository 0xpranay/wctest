import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import {useWeb3React} from "@web3-react/core"
import { useEffect } from 'react';

const RPC_URLS = {
    1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
    4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213"
  };

// const walletconnect = new WalletConnectConnector({
//     rpc: { 4: RPC_URLS[4]},
//     bridge: "https://bridge.walletconnect.org",
//     qrcode: true,
//     // pollingInterval: 12000
// });

const SupportedChainId  = [1, 4]

const walletconnect = new WalletConnectConnector({
    supportedChainIds : SupportedChainId,
    rpc : RPC_URLS,
    bridge: "https://bridge.walletconnect.org",
    qrcode : true
})

function CustomButton()
{
    // useEffect(() => {
    //     activate(walletconnect);

    //     return () => {
    //         disconnect();
    //     }
    // }, [])

    const { active, account, library, activate, deactivate, chainId } = useWeb3React();
    
    async function connect(){
        try{
            if(active === false)
            {
                await activate(walletconnect);
                alert("Connected to " + account + " chain id is " + chainId);
            }
            else alert("Already connected to " + account);
        }
        catch(err){
            console.log(err);
        }
    }
    async function disconnect()
    {
        deactivate();
        await walletconnect.close()
    }

    async function sign()
    {
        let input = prompt("Enter Message");
        const message = await library.getSigner(account).signMessage(input);
        alert(message);
    }

    async function send()
    {
        await library.getSigner(account).sendTransaction(
            { 
                "nonce": account.nonce, // 0 in decimal
                "gasLimit": "0x5208", // 21000 in decimal
                "gasPrice": null, // 1000000000 in decimal
                "to": "0x17A98d2b11Dfb784e63337d2170e21cf5DD04631",
                "value": "0x9184E72A000", // 100000000000000000 in decimal
                "data":"0x", // “empty” value in decimal
                // "chainId": 4 // Ethereum network id
              }
        );
    }
    return (
        <div>
            <button onClick={connect}>Connect Wallet</button>
            <button onClick={sign}>Sign Message</button>
            <button onClick={disconnect}>Disconnect Wallet</button>
            <button onClick={send}>Send TXN</button>
        </div>
    );
}

export default CustomButton;