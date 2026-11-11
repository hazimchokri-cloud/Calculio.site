import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

ts_path = '/src/data/blog/financePosts.ts'

with open(ts_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("slug: 'estimate-savings-growth-compound-interest'", "slug: 'compound-interest-calculator'")

slug_marker = "slug: 'compound-interest-calculator'"
start_index = content.find(slug_marker)

if start_index != -1:
    content = content[:start_index] + content[start_index:].replace("author: BLOG_AUTHORS.davidSterling", "author: BLOG_AUTHORS.calculioEditorial", 1)

    html_start_marker = "htmlContent: `"
    html_start_idx = content.find(html_start_marker, start_index)
    if html_start_idx != -1:
        html_start_idx += len(html_start_marker)
        
        html_end_idx = -1
        i = html_start_idx
        while i < len(content):
            if content[i] == '`':
                if i > 0 and content[i-1] != '\\':
                    html_end_idx = i
                    break
            i += 1
        
        if html_end_idx != -1:
            html_body = content[html_start_idx:html_end_idx]
            
            html_body = re.sub(r'<h1>Compound Interest Calculator: Estimate Your Savings Growth</h1>', '', html_body, flags=re.IGNORECASE)
            
            h2_texts = [
                "How Do You Estimate a Future Balance?",
                "How Does Compound Interest Work?",
                "How Does Compounding Frequency Affect Returns?",
                "How Do Regular Deposits and Account Choices Affect Growth?",
                "What Mistakes Can Make Growth Estimates Misleading?",
                "Build a Savings Plan With Realistic Assumptions",
                "Frequently Asked Questions",
                "Sources and Further Reading"
            ]
            
            def replace_heading(match):
                tag = match.group(1)
                text = match.group(2).strip()
                clean_text = re.sub(r'<.*?>', '', text)
                hid = slugify(clean_text)
                
                target_tag = 'h3'
                for h2_text in h2_texts:
                    if h2_text.lower() in text.lower():
                        target_tag = 'h2'
                        break
                
                return f'<{target_tag} id="{hid}">{text}</{target_tag}>'

            html_body = re.sub(r'<(h[23])>(.*?)</\1>', replace_heading, html_body, flags=re.DOTALL)
            
            faq_marker = '<h2 id="frequently-asked-questions">'
            faq_idx = html_body.find(faq_marker)
            if faq_idx != -1:
                html_body = html_body[:faq_idx].strip()
            
            html_body = re.sub(r'<blockquote>\s*<p><strong>Try it now:</strong>.*?</blockquote>', '', html_body, flags=re.DOTALL)
            html_body = re.sub(r'<a href="https://calculio.site/financial-calculators/compound-interest-calculator/">run this scenario in the Calculio calculator</a>', 'run this scenario in the Calculio calculator', html_body)
            html_body = re.sub(r'Try the <a href="https://calculio.site/financial-calculators/compound-interest-calculator/">Compound Interest Calculator on Calculio</a>', 'Try the Compound Interest Calculator on Calculio', html_body)

            content = content[:html_start_idx] + html_body + content[html_end_idx:]

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Update complete")
