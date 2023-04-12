import Bundlr from "@bundlr-network/client";
import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function main() {
	const bundlr = new Bundlr.default(
		"https://devnet.bundlr.network",
		"solana",
		process.env.PRIVATE_KEY,
		{
			providerUrl: "https://explorer.solana.com/?cluster=devnet",
		},
	);

	console.log('Connected to node, wallet address ${bundlr.address}');

	//const fundTx = await bundlr.fund(1e9);
	//console.log('Fund successful, amount funded = ${fundTx.quantity}');

	//const balance = await bundlr.getLoadedBalance();
	//console.log('account funded balance=${balance.toString()}');

	//const decimalBalance = bundlr.utils.unitConverter(balance);
	//console.log('account funded decimal balance=${decimalBalance.toString()}');

	const pathToFile = "bundlr/article.png";
	const uploadTx = await bundlr.uploadFile(pathToFile);
	console.log('File uploaded URL=https://arweave.net/${uploadTx.id}');
}

main();