from pathlib import Path
r=Path(__file__).parent
html='''<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="PTSD臨床導航：安全評估、診斷條件、共同治療選擇與症狀功能追蹤。依VA/DoD 2023及NICE NG116。"><meta name="theme-color" content="#113747"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'"><title>PTSD 臨床導航</title><style>'''+(r/'styles.css').read_text()+'''</style></head><body><div id="app"></div><noscript>本網頁需要JavaScript。若有急迫危險請直接就醫，不要等待填表。</noscript><script>'''+(r/'engine.js').read_text()+'\n'+(r/'app.js').read_text()+'''</script></body></html>'''
(r/'index.html').write_text(html)
print('Built index.html:',len(html.encode()),'bytes')
