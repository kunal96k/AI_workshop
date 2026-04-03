import os
import re

for file in os.listdir('.'):
    if file.endswith('.html'):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove the back-to-top button completely
        new_content = re.sub(r'<button class="back-to-top".*?</button>', '', content, flags=re.DOTALL)
        
        if new_content != content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Removed back-to-top from {file}')
