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
}


main();