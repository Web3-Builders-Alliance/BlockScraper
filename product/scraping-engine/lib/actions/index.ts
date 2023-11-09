"use server"

import { scrapeAndStoreText } from "../scraper";

export async function scrapeAndStoreURL(webURL: string) {
    if(!webURL) return;

    try {
        const scrapedWebsite = await scrapeAndStoreText(webURL);
    } catch (error: any) {
        throw new Error('Failed to scrape the website: ${error.message}')
    }
}