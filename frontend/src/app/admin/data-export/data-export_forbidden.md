# Forbidden Patterns — `admin/data-export`

## 1. No Client-Side Data Compilation
**FORBIDDEN:** Fetching all records from multiple endpoints and generating a CSV in the browser.
**ALLOWED:** Always request server-side exports via `POST /admin/data-export/request`.

## 2. No Unguarded PII Download
**FORBIDDEN:** Triggering a download without showing a data privacy acknowledgment on first use.

## 3. No `fetch()` Streaming Without Blob Handling
**FORBIDDEN:** Using `fetch()` to download file bytes without converting to a Blob and creating an object URL.
**ALLOWED:** Use `window.open(downloadUrl)` or an `<a href download>` anchor for simple downloads.

## 4. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.
