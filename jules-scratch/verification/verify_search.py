from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1920, "height": 1080})
    page = context.new_page()

    try:
        # Navigate to the local development server
        page.goto("http://localhost:5173/")

        # Click the search icon
        search_button = page.get_by_role("button").filter(has=page.locator("svg.lucide-search")).first
        expect(search_button).to_be_visible(timeout=10000)
        search_button.click()

        # Type into the search input
        search_input = page.get_by_placeholder("Search for perfumes, attars...")
        expect(search_input).to_be_visible(timeout=5000)
        search_input.fill("Oudh")

        # Wait for a moment to let the UI react
        page.wait_for_timeout(2000)

        # Take a screenshot for debugging, without asserting first
        page.screenshot(path="jules-scratch/verification/search_debug.png", full_page=True)

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)