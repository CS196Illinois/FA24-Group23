import scrapy

from logos.items import LogosItem
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

class LogoSpider(scrapy.Spider):
    name = "logo"
    allowed_domains = ["brandeps.com"]
    start_urls = ["https://brandeps.com/logo/Retail"]

    def parse(self, response):
        for logo in response.css("h3"):
            item = LogosItem()
            item["name"] = logo.css("a > img::attr(alt)").get()
            item["picture"] = logo.css("a > img::attr(src)").get()
            item["width"] = logo.css("a > img::attr(width)").get()
            item["height"] = logo.css("a > img::attr(height)").get()
            item["category"] = "Retail"
            yield item

        next_page = response.css("div.pagination > a.nxt::attr(href)").get()
        if next_page:
            next_page_url = response.urljoin(next_page)
            yield scrapy.Request(url=next_page_url, callback=self.parse)
