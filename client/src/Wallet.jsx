import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from"ethereum-cryptography/utils";
import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(secp.getPublicKey(privateKey));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type the Private Key:" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: <span className="address">{address.split(0, 2)} ...</span>
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
