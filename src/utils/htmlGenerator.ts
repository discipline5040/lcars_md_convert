
export const generateStandaloneHTML = (markdown: string, title: string = "LCARS Document") => {
  const lcarsCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
    :root {
      --lcars-orange: #ff9900;
      --lcars-purple: #cc99cc;
      --lcars-blue: #5599ff;
      --lcars-yellow: #ffcc33;
      --lcars-red: #cc0000;
      --lcars-pink: #ff66aa;
      --bg-light: #ffffff;
      --text-dark: #222222;
      --sidebar-bg: #f5f5f5;
    }
    body {
      background-color: var(--bg-light);
      color: var(--text-dark);
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      min-height: 100vh;
      overflow-x: hidden;
    }
    .lcars-container {
      display: flex;
      width: 100%;
    }
    .lcars-sidebar {
      width: 140px;
      display: flex;
      flex-direction: column;
      padding: 20px 10px;
      gap: 12px;
      background-color: var(--sidebar-bg);
      border-right: 2px solid var(--lcars-orange);
    }
    .lcars-elbow {
      height: 100px;
      background-color: var(--lcars-orange);
      border-top-left-radius: 50px;
      margin-bottom: 5px;
      position: relative;
    }
    .lcars-elbow::after {
      content: '';
      position: absolute;
      top: 20px;
      left: 20px;
      right: 0;
      bottom: 0;
      background-color: var(--sidebar-bg);
      border-top-left-radius: 30px;
    }
    .lcars-bar {
      height: 35px;
      background-color: var(--lcars-purple);
      margin-bottom: 5px;
      border-radius: 0 18px 18px 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 15px;
      font-size: 10px;
      font-weight: bold;
      color: rgba(0,0,0,0.5);
      text-transform: uppercase;
    }
    .lcars-bar.blue { background-color: var(--lcars-blue); }
    .lcars-bar.yellow { background-color: var(--lcars-yellow); }
    .lcars-bar.pink { background-color: var(--lcars-pink); }
    
    .lcars-content {
      flex: 1;
      padding: 60px 50px;
      max-width: 900px;
      margin: 0 auto;
    }
    
    /* Typography */
    h1 {
      color: var(--text-dark);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      border-bottom: 6px solid var(--lcars-orange);
      padding-bottom: 15px;
      margin-bottom: 40px;
      font-size: 2.8em;
      font-weight: 800;
    }
    h2 {
      color: var(--text-dark);
      text-transform: uppercase;
      border-left: 10px solid var(--lcars-purple);
      padding-left: 20px;
      margin: 45px 0 25px;
      font-size: 2em;
      font-weight: 700;
    }
    h3 {
      color: var(--lcars-blue);
      text-transform: uppercase;
      margin: 35px 0 15px;
      font-size: 1.5em;
      font-weight: 600;
    }
    p { line-height: 1.8; color: #444; margin-bottom: 22px; font-size: 1.15em; }
    strong { color: #000; font-weight: 700; }
    a { color: var(--lcars-blue); text-decoration: none; border-bottom: 2px solid rgba(85, 153, 255, 0.2); transition: 0.2s; }
    a:hover { border-bottom-color: var(--lcars-blue); background-color: rgba(85, 153, 255, 0.05); }
    code { background: #f0f0f0; color: #d63384; padding: 3px 7px; border-radius: 5px; font-family: monospace; font-size: 0.9em; }
    pre { background: #f8f9fa; border-left: 5px solid var(--lcars-yellow); padding: 25px; border-radius: 0 12px 12px 0; overflow-x: auto; margin: 35px 0; border: 1px solid #eee; }
    img { max-width: 100%; border-radius: 12px; border: 1px solid #ddd; margin: 35px 0; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    ul { list-style: none; padding: 0; }
    li { position: relative; padding-left: 35px; margin-bottom: 18px; line-height: 1.6; }
    li::before { content: ''; position: absolute; left: 0; top: 10px; width: 18px; height: 6px; background: var(--lcars-pink); border-radius: 3px; }
    
    @media (max-width: 768px) {
      .lcars-sidebar { width: 70px; }
      .lcars-content { padding: 40px 25px; }
      h1 { font-size: 2em; }
      .lcars-bar span { display: none; }
    }
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>${lcarsCSS}</style>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>
<body>
    <div class="lcars-container">
        <div class="lcars-sidebar">
            <div class="lcars-elbow"></div>
            <div class="lcars-bar"><span>02-394</span></div>
            <div class="lcars-bar blue"><span>48-102</span></div>
            <div class="lcars-bar yellow"><span>99-382</span></div>
            <div class="lcars-bar pink"><span>11-004</span></div>
            <div class="lcars-bar" style="flex: 1; opacity: 0.05; background-color: #000;"></div>
            <div class="lcars-bar red" style="background-color: var(--lcars-red); height: 80px; border-radius: 20px 20px 0 0;"><span>911</span></div>
        </div>
        <div class="lcars-content" id="content">
            <div style="text-align: center; padding: 50px; opacity: 0.5;">Initializing Data Stream...</div>
        </div>
    </div>
    <script>
        const md = ${JSON.stringify(markdown)};
        document.getElementById('content').innerHTML = marked.parse(md);
    </script>
</body>
</html>
  `.trim();
};
