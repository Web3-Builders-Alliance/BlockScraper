from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

driver.get("https://www.google.com/")
search = driver.find_element(by=By.NAME,value="q")
search.send_keys("regenerative finance solana")
search.send_keys(Keys.ENTER)

driver.maximize_window()

driver.save_screenshot('refi.png')
