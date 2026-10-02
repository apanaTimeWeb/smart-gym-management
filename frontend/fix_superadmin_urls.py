import os
import re

directory = r"c:\Users\satya\Desktop\PojectsToWork\Smart-Gym-Management\frontend\src\app\frontend_superadmin"

replacements = {
    "/superadmin/dashboard": "/frontend_superadmin/superadmin_dashboard",
    "/superadmin/gyms": "/frontend_superadmin/superadmin_gyms",
    "/superadmin/usage-meters": "/frontend_superadmin/superadmin_usage_meters",
    "/superadmin/tickets": "/frontend_superadmin/superadmin_tickets",
    "/superadmin/settings": "/frontend_superadmin/superadmin_settings",
    "/superadmin/system-ops/jobs": "/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs",
    "/superadmin/system-ops/infrastructure": "/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure",
    "/superadmin/reports": "/frontend_superadmin/superadmin_reports",
    "/superadmin/saas-billing/plans": "/frontend_superadmin/superadmin_plans",
    "/superadmin/saas-billing/invoices": "/frontend_superadmin/superadmin_invoices",
    "/superadmin/saas-billing/coupons": "/frontend_superadmin/superadmin_coupons",
    "/superadmin/profile": "/frontend_superadmin/superadmin_profile",
    "/superadmin/messaging": "/frontend_superadmin/superadmin_messaging",
    "/superadmin/global-audit": "/frontend_superadmin/superadmin_global_audit",
    "/superadmin/features": "/frontend_superadmin/superadmin_features",
    "/superadmin/broadcasts": "/frontend_superadmin/superadmin_broadcasts",
    "/superadmin/affiliates": "/frontend_superadmin/superadmin_affiliates",
    "/superadmin/analytics": "/frontend_superadmin/superadmin_analytics",
    "/superadmin/cancellations": "/frontend_superadmin/superadmin_cancellations",
    "/superadmin/integrations": "/frontend_superadmin/superadmin_integrations",
    "/superadmin/compliance": "/frontend_superadmin/superadmin_compliance",
    "/superadmin/team": "/frontend_superadmin/superadmin_team",
    "/superadmin/system-ops/backups": "/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups",
    "/superadmin/system-ops/migrations": "/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations",
    "/superadmin/white-labeling": "/frontend_superadmin/superadmin_white_labeling",
}

def update_line(line):
    for k, v in replacements.items():
        if f'"{k}"' in line or f"'{k}'" in line:
            line = line.replace(f'"{k}"', f'"{v}"')
            line = line.replace(f"'{k}'", f"'{v}'")
    return line

count = 0
for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith("_url_config.ts"):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            lines = content.split('\n')
            new_lines = []
            for line in lines:
                if "MAIN:" in line or "GYMS:" in line or "PAGES:" in line or "CANCELLATIONS:" in line or "ADD:" in line:
                    new_lines.append(update_line(line))
                else:
                    new_lines.append(line)
            
            new_content = '\n'.join(new_lines)
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1

print(f"Fixed {count} url config files.")
