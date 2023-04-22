// @ts-check
import express from "express";
import bodyParser from "body-parser";
import { JsonRpcProvider, formatEther } from "ethers";

const app = express();

app.use(bodyParser.json());

const decimals = 18;
const factor = 10 ** decimals;
app.post("/", async (req, res) => {
  try {
    const { address, rpc, limit } = req.body;
    const provider = new JsonRpcProvider(rpc);
    const balance = await provider.getBalance(address);
    if (balance < BigInt(limit * factor)) {
      res.send("below limit");
      res.status(400);
    } else res.send("ok");
    res.end();
  } catch (e) {
    console.log(e);
    res.send("failed to check balance");
    res.status(500);
    res.end();
  }
});
app.post("/balance", async (req, res) => {
  try {
    const { address, rpc } = req.body;
    const provider = new JsonRpcProvider(rpc);
    const balance = await provider.getBalance(address);
    res.send(formatEther(balance));
    res.status(400);
    res.end();
  } catch (e) {
    console.log(e);
    res.send("failed to check balance");
    res.status(500);
    res.end();
  }
});

app.listen(3043, "0.0.0.0");
