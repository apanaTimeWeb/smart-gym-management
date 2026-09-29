"""
RESPONSIBILITY: Verifies Landing public booking/contact happy paths through the real frontend UI.
FLOW: Selenium WebDriver -> /landing -> source-derived test IDs -> public API -> success state.
"""

import os

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def _base_url() -> str:
    """Return the runtime frontend URL required by the host integration environment."""
    return os.environ["LANDING_FRONTEND_BASE_URL"].rstrip("/")


def _driver() -> webdriver.Chrome:
    """Create one isolated Chrome WebDriver for each UI scenario."""
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    return webdriver.Chrome(options=options)


def _find(driver: webdriver.Chrome, test_id: str):
    """Locate a source-derived element, falling back to a source-derived XPath locator."""
    selectors = [
        (By.CSS_SELECTOR, f'[data-testid="{test_id}"]'),
        (By.XPATH, f'//*[@data-testid="{test_id}"]'),
    ]
    last_error = None
    for by, value in selectors:
        try:
            return WebDriverWait(driver, 10).until(EC.presence_of_element_located((by, value)))
        except Exception as error:  # noqa: BLE001 - fallback locator is the test's explicit resilience boundary.
            last_error = error
    raise AssertionError(f"Could not locate source-derived test id {test_id!r}") from last_error


def test_landing_booking_happy_path():
    """Submit a valid booking and assert the frontend success state."""
    driver = _driver()
    try:
        driver.get(f"{_base_url()}/landing")
        _find(driver, "landing-booking-name-input").send_keys("Selenium Test")
        _find(driver, "landing-booking-email-input").send_keys("selenium@example.com")
        _find(driver, "landing-booking-phone-input").send_keys("9876543210")
        date_input = _find(driver, "landing-booking-date-input")
        driver.execute_script("arguments[0].value = arguments[1]; arguments[0].dispatchEvent(new Event('change', {bubbles:true}));", date_input, "2026-10-01")
        _find(driver, "landing-booking-type-trial").click()
        _find(driver, "landing-booking-submit").click()
        assert _find(driver, "landing-booking-success-state").is_displayed()
    finally:
        driver.quit()


def test_landing_contact_happy_path():
    """Submit a valid contact form and assert the frontend success state."""
    driver = _driver()
    try:
        driver.get(f"{_base_url()}/landing")
        _find(driver, "landing-contact-name-input").send_keys("Selenium Contact")
        _find(driver, "landing-contact-email-input").send_keys("contact@example.com")
        _find(driver, "landing-contact-message-input").send_keys("I would like more information.")
        _find(driver, "landing-contact-submit").click()
        assert _find(driver, "landing-contact-success-state").is_displayed()
    finally:
        driver.quit()
