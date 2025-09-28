from playwright.sync_api import sync_playwright, expect

def run_verification():
    """
    This script verifies that the product order is reversed on the collections page
    and that clicking a product navigates to the correct single product page.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Navigate to the collections page.
        page.goto("http://localhost:5173/#/collections")
        page.wait_for_load_state("networkidle")


        # 2. Locate the specific "Collections" section.
        collections_section = page.locator("section").filter(has=page.get_by_role("heading", name="Collections"))

        # 3. Verify the product order is reversed within that section.
        first_product = collections_section.locator(".group").first
        expect(first_product.locator("h3")).to_have_text("Patel London White")

        # 4. Take a screenshot of the collections page.
        page.screenshot(path="jules-scratch/verification/collections_page.png")
        print("Successfully created collections_page.png")

        # 5. Click on the first product.
        first_product.click()

        # 6. Verify navigation to the single product page.
        expect(page).to_have_url("http://localhost:5173/#/product/patel-london-white", timeout=10000)
        page.wait_for_load_state("networkidle")

        # 7. Verify the content of the single product page.
        expect(page.get_by_role("heading", name="Patel London White")).to_be_visible()
        expect(page.locator(".text-3xl")).to_have_text("₹400")

        # 8. Take a screenshot of the single product page.
        page.screenshot(path="jules-scratch/verification/single_product_page.png")
        print("Successfully created single_product_page.png")

        browser.close()

if __name__ == "__main__":
    run_verification()