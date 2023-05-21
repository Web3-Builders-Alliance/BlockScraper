import requests
import json
import pandas as pd

LAMPORTS_PER_SOL = 1000000000

symbol = "DeGods"

url = "http://api-mainnet.magiceden.dev/v2/collections/{symbol}/stats".format(symbol=symbol.lower().replace(" ", "_"))

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)

#Example

url = "http://api-mainnet.magiceden.dev/v2/collections?offset=0&limit=500"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

#print(response.text)
a = json.loads(response.text)

print(type(a))
print(type(a[0]))

def get_all_nft_projects():
    offset = 0
    lst_name = []
    lst_symbol = []
    lst_cat = []
    while True:
        url = f"http://api-mainnet.magiceden.dev/v2/collections?offset={offset}&limit=500"
        payload = {}
        headers = {}
        response = requests.request("GET", url, headers=headers, data=payload)
        resp = response.json()
        if resp == []:
            break
        for obj in resp:
            lst_name.append(obj["name"])
            lst_symbol.append(obj["symbol"])
            if "categories" in obj:
                lst_cat.append(obj["categories"])
            else:
                lst_cat.append(None)
        offset += 500
    return lst_name, lst_symbol, lst_cat

lst_name, lst_symbol, lst_cat = get_all_nft_projects()

print(len(lst_name))
print(len(lst_symbol))
print(len(lst_cat))

df = pd.DataFrame(columns=["NFT_Collection_Name", "Symbol", "Categories"])
df["NFT_Collection_Name"] = lst_name
df["Symbol"] = lst_symbol
df["Categories"] = lst_cat

print(df)
print(df.describe())