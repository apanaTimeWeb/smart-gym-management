# RESPONSIBILITY: Negative browser flow verifying protected access behavior for Superadmin system-ops/backups.
# FLOW: Fresh browser → Protected route → No authenticated session → Visible denial/redirect behavior.
# MODULE: superadmin_system_ops_backups
# RULE: Rule 121 — Complete E2E/Selenium isolation.

import os

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

BASE_URL = os.environ.get("SUPERADMIN_SELENIUM_BASE_URL", "http://localhost:3000").rstrip("/")
ROUTE = '/superadmin/system-ops/backups'
EXPECTED_HEADINGS = ['Trigger Global Backup', 'Restore Database Snapshot', 'Tenant Database Backups']

def _start_fresh_driver() -> webdriver.Chrome:
    options = webdriver.ChromeOptions()
    if os.environ.get("SUPERADMIN_SELENIUM_HEADLESS", "1") == "1":
        options.add_argument("--headless=new")
    options.add_argument("--window-size=1440,1000")
    return webdriver.Chrome(options=options)

def _visible_text(driver: webdriver.Chrome) -> str:
    # PRIMARY LOCATOR: document body by tag name.
    # BACKUP LOCATOR: semantic body XPath if browser/DOM implementation changes the primary lookup behavior.
    try:
        return driver.find_element(By.TAG_NAME, "body").text.strip().lower()
    except Exception:
        return driver.find_element(By.XPATH, "//body").text.strip().lower()

@pytest.fixture()
def driver():
    browser = _start_fresh_driver()
    browser.delete_all_cookies()
    yield browser
    browser.quit()

class TestSuperadminSystemOpsBackupsUIEdge:
    """Protected-route negative flow without authentication."""

    def test_protected_route_does_not_expose_authenticated_surface(self, driver):
        driver.get(f"{BASE_URL}{ROUTE}")
        WebDriverWait(driver, 15).until(lambda current: current.execute_script("return document.readyState") == "complete")
        url = driver.current_url.lower()
        body = _visible_text(driver)
        protected_heading_visible = any(expected.lower() in body for expected in EXPECTED_HEADINGS)
        login_or_access_denied = any(token in url or token in body for token in ("/login", "sign in", "unauthorized", "access denied", "forbidden"))
        assert (not protected_heading_visible) or login_or_access_denied
