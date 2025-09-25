from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5173/#collections/all")
    page.hover("text=Collections")
    page.click("text=attar")
    page.wait_for_timeout(5000)
    page.screenshot(path="jules-scratch/verification/collections.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)