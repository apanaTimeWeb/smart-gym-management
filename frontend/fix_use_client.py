import os

root_dir = r"c:\Users\satya\Desktop\PojectsToWork\Smart-Gym-Management\frontend\src\app\frontend_superadmin"

count = 0
for subdir, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            filepath = os.path.join(subdir, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if "'use client';" in content:
                # We want to replace all occurrences of 'use client';
                new_content = content.replace("'use client';", "")
                
                # Prepend one at the top
                new_content = "'use client';\n" + new_content.lstrip()
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    count += 1

print(f"Fixed {count} files.")
