import os
import glob

admin_e2e_path = r"c:\Users\satya\Desktop\PojectsToWork\Smart-Gym-Management\backend\gymsmart-api\backend_e2e\backend_admin_e2e"

for filepath in glob.glob(os.path.join(admin_e2e_path, "*", "test_admin_*_api*.py")):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace /api/v1/api/admin with /admin
    content = content.replace("'/api/v1/api/admin", "'/admin")
    content = content.replace('"/api/v1/api/admin', '"/admin')
    # Replace /api/v1/admin with /admin
    content = content.replace("'/api/v1/admin", "'/admin")
    content = content.replace('"/api/v1/admin', '"/admin')

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Stripped /api/v1 from all paths")
