export const layout = (content) => `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Somnus</title>
  <style>
    body { margin: 0; font-family: system-ui; background: #0b1020; color: #e5e7eb; display: flex; align-items: center; justify-content: center; height: 100vh; }
    .card { background: #111827; padding: 28px; border-radius: 14px; width: 100%; max-width: 420px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .item { background: #0b1020; padding: 12px; border-radius: 10px; margin-top: 12px; border: 1px solid #1f2937; }
    .row { display: flex; justify-content: space-between; align-items: center; }
    .password { margin-top: 8px; font-family: monospace; letter-spacing: 2px; font-size: 15px; transition: 0.3s; }
    .hidden { filter: blur(6px); user-select: none; }
    button { background: #1f2937; border: none; color: #e5e7eb; padding: 6px 10px; border-radius: 6px; cursor: pointer; }
    input { width: 100%; padding: 10px; margin: 10px 0; border-radius: 6px; border: 1px solid #374151; background: #0b1020; color: white; box-sizing: border-box; }
    .btn-primary { width: 100%; background: #3b82f6; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: bold; }
    .footer { margin-top: 14px; text-align: center; font-size: 11px; opacity: 0.4; }
  </style>
</head>
<body>
  <div class="card">${content}</div>
  <script>
    function toggle(id) { document.getElementById(id).classList.toggle('hidden'); }
    function copy(text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        const old = btn.innerText; btn.innerText = "✓";
        setTimeout(() => btn.innerText = old, 1200);
      });
    }
  </script>
</body>
</html>`;
