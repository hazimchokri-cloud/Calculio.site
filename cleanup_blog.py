import re
import os

ts_path = 'src/data/blog/financePosts.ts'

if not os.path.exists(ts_path):
    print(f"File {ts_path} not found")
    exit(1)

with open(ts_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Author
content = content.replace("author: BLOG_AUTHORS.davidSterling,", "author: BLOG_AUTHORS.calculioEditorial,")

# 2. Process htmlContent for the specific post
slug = 'estimate-savings-growth-compound-interest'
start_marker = f"slug: '{slug}'"
slug_pos = content.find(start_marker)

if slug_pos != -1:
    # Find htmlContent block
    html_start_marker = "htmlContent: `"
    html_start_pos = content.find(html_start_marker, slug_pos) + len(html_start_marker)
    html_end_pos = content.find("`", html_start_pos)
    
    html_body = content[html_start_pos:html_end_pos]
    
    # 4. Remove H1 line
    html_body = re.sub(r'<h1>.*?</h1>', '', html_body, count=1, flags=re.IGNORECASE | re.DOTALL)
    
    # 6. Remove duplicated content from HTML
    faq_match = re.search(r'<h2>Frequently Asked Questions</h2>', html_body, re.IGNORECASE)
    if faq_match:
        html_body = html_body[:faq_match.start()]
    
    sources_match = re.search(r'<h2>Sources and Further Reading</h2>', html_body, re.IGNORECASE)
    if sources_match:
        html_body = html_body[:sources_match.start()]

    html_body = html_body.strip()
    
    # Update content
    content = content[:html_start_pos] + html_body + content[html_end_pos:]

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated financePosts.ts")
