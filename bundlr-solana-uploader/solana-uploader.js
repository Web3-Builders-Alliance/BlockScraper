import Bundlr from "@bundlr-network/client";
import { default as fsWithCallbacks } from "fs";
import dotenv from "dotenv";
dotenv.config();
const fs = fsWithCallbacks.promises;

// change this to the name of the file you want to upload
const fileToUpload = "./demo.png";

// Connect to a node
const bundlr = new Bundlr.default("https://devnet.bundlr.network", "solana", process.env.PRIVATE_KEY, {
	providerUrl: "https://api.devnet.solana.com",
});
console.log(`connected to node from wallet ${bundlr.address}`);

// Check price to upload

const { size } = await fs.stat(fileToUpload);
const price = await bundlr.getPrice(size);
const priceConverted = bundlr.utils.unitConverter(price);
console.log(`cost to upload ${size} bytes is ${priceConverted} SOL`);

// fund node
const fundTx = await bundlr.fund(price);
console.log(`successfully funded node`);

// upload
try {
	const response = await bundlr.uploadFile(fileToUpload);
	console.log(`file uploaded ==> https://arweave.net/${response.id}`);
} catch (e) {
	console.log("Error uploading file ", e);
}
