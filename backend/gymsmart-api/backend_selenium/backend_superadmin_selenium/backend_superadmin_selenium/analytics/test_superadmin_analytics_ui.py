# RESPONSIBILITY: Browser-level happy-path smoke flow for the Superadmin analytics feature.
# FLOW: Browser → Route → Authenticated session → Visible page data → Assertion.
# MODULE: superadmin_analytics
# RULE: Rule 121 — Complete E2E/Selenium isolation.

import os

import pytest
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

BASE_URL = os.environ.get("SUPERADMIN_SELENIUM_BASE_URL", "http://localhost:3000").rstrip("/")
COOKIE_NAME = os.environ.get("SUPERADMIN_SELENIUM_COOKIE_NAME")
COOKIE_VALUE = os.environ.get("SUPERADMIN_SELENIUM_COOKIE_VALUE")
EXPECTED_HEADINGS = ['Revenue Analytics', 'Monthly Income Growth Trend', 'Active Gyms']
ROUTE = '/superadmin/analytics'

def _start_fresh_driver() -> webdriver.Chrome:
    options = webdriver.ChromeOptions()
    if os.environ.get("SUPERADMIN_SELENIUM_HEADLESS", "1") == "1":
        options.add_argument("--headless=new")
    options.add_argument("--window-size=1440,1000")
    return webdriver.Chrome(options=options)

def _authenticate(driver: webdriver.Chrome) -> None:
    if not COOKIE_NAME or COOKIE_VALUE is None:
        pytest.skip("Provide SUPERADMIN_SELENIUM_COOKIE_NAME and SUPERADMIN_SELENIUM_COOKIE_VALUE")
    driver.get(BASE_URL)
    driver.add_cookie({"name": COOKIE_NAME, "value": COOKIE_VALUE, "path": "/"})
    driver.get(f"{BASE_URL}{ROUTE}")

def _wait_for_visible_heading(driver: webdriver.Chrome) -> str:
    def find_heading(_driver):
        try:
            # PRIMARY LOCATOR: stable data-testid.
            # BACKUP LOCATOR: semantic heading XPath is required if the primary selector is unavailable.
            primary = _driver.find_element(By.CSS_SELECTOR, "[data-testid='superadmin-page-title']")
            if primary.is_displayed() and primary.text.strip():
                return primary.text.strip()
        except NoSuchElementException:
            pass
        for candidate in _driver.find_elements(By.XPATH, "//*[self::h1 or self::h2 or self::h3]"):
            if candidate.is_displayed() and candidate.text.strip():
                value = candidate.text.strip()
                if any(expected.lower() in value.lower() for expected in EXPECTED_HEADINGS):
                    return value
        return False
    return WebDriverWait(driver, 15).until(find_heading)

@pytest.fixture()
def driver():
    browser = _start_fresh_driver()
    _authenticate(browser)
    yield browser
    browser.quit()

class TestSuperadminAnalyticsUI:
    """Happy-path visible UI proof for the analytics route."""

    def test_page_loads_with_expected_visible_surface(self, driver):
        title = _wait_for_visible_heading(driver)
        assert any(expected.lower() in title.lower() for expected in EXPECTED_HEADINGS)
        assert driver.current_url.startswith(BASE_URL)
