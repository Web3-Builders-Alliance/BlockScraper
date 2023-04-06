from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import codecs
import re
from webdriver_manager.chrome import ChromeDriverManager

driver=webdriver.Chrome(service=Service(ChromeDriverManager().install()))
val = input("Enter a url: ")
wait = WebDriverWait(driver, 10)
driver.get(val)
get_url = driver.current_url
wait.until(EC.url_to_be(val))

if get_url == val:
    page_source = driver.page_source

soup = BeautifulSoup(page_source,features="html.parser")
keyword=input("Enter a keyword to find instances of in the article:")
matches = soup.body.find_all(string=re.compile(keyword))
len_match = len(matches)
title = soup.title.text

file=codecs.open('article_scraping.txt', 'a+')
file.write(title+"\n")
file.write("The following are all instances of your keyword:\n")
count=1

for i in matches:
    file.write(str(count) + "." +  i  + "\n")
    count+=1

file.write("There were" +str(len_match)+ "matches found for the keyword.")
file.close()
driver.quit()
