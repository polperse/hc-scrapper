from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

my_url = 'http://www.hcrealms.com/forum/units/units_figure.php?q=jw050'

uClient = uReq(my_url)
