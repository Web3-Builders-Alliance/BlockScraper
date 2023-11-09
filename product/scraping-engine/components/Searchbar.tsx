"use client"
import React, { FormEvent, useState } from 'react';

const isValidWebsiteURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if(
      hostname.includes('membership') || 
      hostname.includes('about') || 
      hostname.endsWith('blockscraper')
      ) {
        return true;
      }
  } catch (error) {
    return false;
  }

  return false;
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidWebsiteURL(searchPrompt);

    if(!isValidLink) return alert('Not found')

    try {
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form 
    className = "flex flex-wrap gap-4 mt-12"
    onSubmit = {handleSubmit}
    >
        <input
        type = "text"
        value = {searchPrompt}
        onChange = {(e) => setSearchPrompt(e.target.value)}
        placeholder = "search for our services"
        className = "searchbar-input"
        disabled = {searchPrompt === ''}
        />

        <button type = "submit" className = "searchbar-btn">
        {isLoading ? 'Searching...' : 'Search'}
        </button>
    </form>
  )
}

export default Searchbar