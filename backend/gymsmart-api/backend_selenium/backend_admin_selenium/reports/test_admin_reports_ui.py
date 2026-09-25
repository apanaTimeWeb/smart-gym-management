# RESPONSIBILITY: Validates real-browser rendering and backend-facing data flow for Admin reports.
# FLOW: Browser → Admin route → visible UI → backend network observation → assertion.
# MODULE: admin_reports
# RULE: Rule 121 — Complete E2E/Selenium isolation.

import os

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


BASE_URL = os.environ["SELENIUM_BASE_URL"].rstrip("/")
ROUTE = "/admin/reports"
EXPECTED_API_FRAGMENTS = ['/admin/reports']


class TestAdminReportsUI:
    """Happy-path browser flows for Admin reports."""

    @pytest.fixture()
    def driver(self):
        options = webdriver.ChromeOptions()
        if os.environ.get("SELENIUM_HEADLESS", "1") == "1":
            options.add_argument("--headless=new")
        options.add_argument("--window-size=1440,1000")
        browser = webdriver.Chrome(options=options)
        browser.set_page_load_timeout(30)
        try:
            yield browser
        finally:
            browser.quit()

    def _open_route(self, driver, route: str) -> None:
        driver.get(f"{BASE_URL}{route}")
        WebDriverWait(driver, 20).until(lambda d: d.execute_script("return document.readyState") == "complete")

    def _assert_no_visible_server_error(self, driver) -> None:
        body = driver.find_element(By.TAG_NAME, "body").text.lower()
        forbidden = ("internal server error", "application error", "500 internal")
        assert not any(marker in body for marker in forbidden), body[:1500]

    def test_route_loads_and_does_not_show_server_error(self, driver):
        """Admin reports route renders and does not expose a server error page."""
        self._open_route(driver, ROUTE)
        self._assert_no_visible_server_error(driver)
        assert driver.find_element(By.TAG_NAME, "body").is_displayed()

    def test_backend_facing_request_is_observed(self, driver):
        """The page performs at least one request containing the module API path fragment."""
        self._open_route(driver, ROUTE)
        entries = driver.execute_script("return performance.getEntriesByType('resource').map((entry) => entry.name);")
        joined = "\n".join(str(x) for x in entries)
        assert any(fragment in joined for fragment in EXPECTED_API_FRAGMENTS), joined[:5000]
