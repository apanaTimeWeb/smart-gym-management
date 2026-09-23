import os
import sys
import subprocess
import requests

# Default to localhost if not provided
BASE_URL = os.environ.get('MANAGER_E2E_BASE_URL', 'http://localhost:3000').rstrip('/')

def run_tests():
    print("--- GymSmart Manager E2E Auto-Runner ---")
    email = os.environ.get('MANAGER_E2E_EMAIL')
    password = os.environ.get('MANAGER_E2E_PASSWORD')

    if not email or not password:
        print("Please provide the credentials of a seeded Manager user to fetch live tokens.")
        email = input("Email: ").strip()
        import getpass
        password = getpass.getpass("Password: ")

    print(f"\n[1/3] Authenticating as {email} at {BASE_URL}/api/v1/auth/login...")
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/v1/auth/login",
            json={"email": email, "password": password},
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code != 200:
            print(f"Login failed! Status: {response.status_code}")
            print(response.text)
            sys.exit(1)

        data = response.json().get('data', {})
        token = data.get('accessToken')
        user = data.get('user', {})
        tenant_id = user.get('tenantId')

        if not token or not tenant_id:
            print("Login succeeded, but missing accessToken or tenantId in the response payload.")
            print("Payload:", data)
            sys.exit(1)

        print("[2/3] Login successful! Extracted live Token and Tenant ID.")
        
        # Set environment variables for the pytest runner
        os.environ['MANAGER_E2E_BASE_URL'] = BASE_URL
        os.environ['MANAGER_E2E_TENANT_ID'] = tenant_id
        os.environ['MANAGER_E2E_TOKEN'] = token

        print("[3/3] Launching Pytest...")
        print("----------------------------------------\n")
        
        # Run pytest inside the backend_manager_e2e directory
        e2e_dir = os.path.join(os.path.dirname(__file__), 'backend_manager_e2e')
        
        # Propagate the modified environment variables to the subprocess
        result = subprocess.run([sys.executable, "-m", "pytest", "-v"], cwd=e2e_dir, env=os.environ)
        
        sys.exit(result.returncode)

    except requests.exceptions.ConnectionError:
        print(f"\nERROR: Could not connect to {BASE_URL}.")
        print("Please ensure your NestJS backend server is running (`npm run start:dev`).")
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
