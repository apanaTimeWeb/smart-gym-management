# RESPONSIBILITY: Validates negative/query-edge browser behavior for Admin gym-health-alerts.
# FLOW: Browser → malformed/edge request state → visible UI assertion.
# MODULE: admin_gym-health-alerts
# RULE: Rule 121 — Complete E2E/Selenium isolation.

import os

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

BASE_URL = os.environ["SELENIUM_BASE_URL"].rstrip("/")
ROUTE = "/admin/gym-health-alerts"


class TestAdminGymHealthAlertsUIEdge:
    """Edge-case browser flows for Admin gym-health-alerts."""

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

    def test_invalid_pagination_or_query_state_does_not_expose_500(self, driver):
        """An invalid query state must not result in a visible 500/server error page."""
        driver.get(f"{BASE_URL}{ROUTE}?page=0&limit=0&sortKey=__invalid__&sortDir=INVALID")
        WebDriverWait(driver, 20).until(lambda d: d.execute_script("return document.readyState") == "complete")
        body = driver.find_element(By.TAG_NAME, "body").text.lower()
        assert "internal server error" not in body
        assert "500 internal" not in body
        assert driver.find_element(By.TAG_NAME, "body").is_displayed()

    def test_reload_is_stable(self, driver):
        """A full browser reload leaves the feature on a renderable page."""
        driver.get(f"{BASE_URL}{ROUTE}")
        WebDriverWait(driver, 20).until(lambda d: d.execute_script("return document.readyState") == "complete")
        driver.refresh()
        WebDriverWait(driver, 20).until(lambda d: d.execute_script("return document.readyState") == "complete")
        body = driver.find_element(By.TAG_NAME, "body").text.lower()
        assert "internal server error" not in body
        assert "application error" not in body
