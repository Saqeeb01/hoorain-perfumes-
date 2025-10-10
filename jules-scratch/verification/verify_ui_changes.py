from playwright.sync_api import sync_playwright, Page, expect
import re

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the home page and take a screenshot
        page.goto("http://localhost:5173/")
        # Wait for the loading indicator to disappear
        expect(page.locator(".fixed.inset-0 .w-16.h-16")).to_be_hidden()
        page.screenshot(path="jules-scratch/verification/01_home_page.png")

        # 2. Click on the "Collections" link and take a screenshot
        page.get_by_role("navigation").get_by_role("button", name="Collections").click()
        page.wait_for_timeout(500) # Wait for animation
        page.screenshot(path="jules-scratch/verification/02_collections_menu.png")

        # 3. Click on the "All Collections" link
        page.get_by_role("link", name="All Collections").click()
        expect(page.locator(".fixed.inset-0 .w-16.h-16")).to_be_hidden()

        # 4. Add an item to the cart
        add_to_cart_button = page.get_by_label(re.compile(r"Add .* to cart")).first
        add_to_cart_button.click()
        page.wait_for_timeout(500) # Wait for animation

        # 5. Open the cart and take a screenshot
        page.get_by_label("Open cart").click()
        page.wait_for_timeout(1000) # Wait for animation
        page.screenshot(path="jules-scratch/verification/03_cart_drawer.png")

        # 6. Close the cart
        page.get_by_role("button", name="Close").click()
        page.wait_for_timeout(500)

        # 7. Scroll down the page to make the scroll to top button visible
        page.mouse.wheel(0, 800)
        page.wait_for_timeout(1000) # Wait for scroll animation and button to appear
        page.screenshot(path="jules-scratch/verification/04_scrolled_down.png")

        # 8. Click the "Scroll to Top" button
        page.get_by_label("Scroll to top").click()
        page.wait_for_timeout(1000) # Wait for scroll animation
        page.screenshot(path="jules-scratch/verification/05_scrolled_to_top.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)