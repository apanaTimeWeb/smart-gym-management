"""
RESPONSIBILITY: Verifies Landing frontend field-level validation through the real UI.
FLOW: Selenium WebDriver -> /landing -> invalid source-derived form state -> field error.
"""

import os

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def _driver() -> webdriver.Chrome:
    """Create an isolated headless browser for one validation scenario."""
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    return webdriver.Chrome(options=options)


def _base_url() -> str:
    """Return the runtime frontend URL required by the host integration environment."""
    return os.environ["LANDING_FRONTEND_BASE_URL"].rstrip("/")


def _find(driver: webdriver.Chrome, test_id: str):
    """Locate one source-derived element by its exact test id or an equivalent XPath."""
    for by, value in (
        (By.CSS_SELECTOR, f'[data-testid="{test_id}"]'),
        (By.XPATH, f'//*[@data-testid="{test_id}"]'),
    ):
        try:
            return WebDriverWait(driver, 10).until(EC.presence_of_element_located((by, value)))
        except Exception:  # noqa: BLE001 - fallback locator is intentional.
            continue
    raise AssertionError(f"Could not locate source-derived test id {test_id!r}")


def test_landing_booking_invalid_email_shows_field_error():
    """Verify the booking email field rejects the source-documented invalid format."""
    driver = _driver()
    try:
        driver.get(f"{_base_url()}/landing")
        _find(driver, "landing-booking-name-input").send_keys("Validation Test")
        _find(driver, "landing-booking-email-input").send_keys("not-an-email")
        _find(driver, "landing-booking-phone-input").send_keys("9876543210")
        _find(driver, "landing-booking-submit").click()
        assert _find(driver, "landing-booking-email-error").is_displayed()
    finally:
        driver.quit()


def test_landing_contact_empty_message_shows_field_error():
    """Verify the contact form requires a non-empty message."""
    driver = _driver()
    try:
        driver.get(f"{_base_url()}/landing")
        _find(driver, "landing-contact-name-input").send_keys("Validation Contact")
        _find(driver, "landing-contact-email-input").send_keys("contact@example.com")
        _find(driver, "landing-contact-submit").click()
        assert _find(driver, "landing-contact-message-error").is_displayed()
    finally:
        driver.quit()
