export function renderPage({ allowed, data }) {
  return `
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>Somnus</title>

<style>
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
    background: #0b1020;
    color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .card {
    background: #111827;
    padding: 28px;
    border-radius: 14px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  }

  h1 {
    text-align: center;
    margin: 0 0 20px;
    font-size: 20px;
  }

  .item {
    display: flex;
    flex-direction: column;
    background: #0b1020;
    padding: 12px;
    border-radius: 10px;
    margin-top: 12px;
    border: 1px solid transparent;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .label {
    font-size: 13px;
    opacity: 0.7;
  }

  .controls {
    display: flex;
    gap: 6px;
  }

  button {
    background: #1f2937;
    border: none;
    color: #e5e7eb;
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.15s ease;
  }

  button:hover {
    background: #374151;
  }

  .password {
    margin-top: 8px;
    font-family: monospace;
    letter-spacing: 2px;
    font-size: 15px;
  }

  .hidden {
    filter: blur(6px);
    user-select: none;
  }

  .locked {
    text-align: center;
    opacity: 0.6;
    line-height: 1.6;
  }

  .footer {
    margin-top: 18px;
    text-align: center;
    font-size: 12px;
    opacity: 0.4;
  }
</style>
</head>

<body>
  <div class="card">
    ${
      allowed
        ? `
        ${renderItem('awesome.murad.1', data.mail1)}
        ${renderItem('awesome.murad.2', data.mail2)}
        ${renderItem('Cloudflare', data.cloudflare)}
        ${renderItem('Screen Time', data.screen)}
        `
        : `
        <div class="locked">
          Locked 🔒<br>
          Only available from 04:00 to 05:00
        </div>
        `
    }

    <div class="footer">
      Timezone: Europe/Lisbon
    </div>
  </div>

<script>
  function toggle(id) {
    const el = document.getElementById(id);
    el.classList.toggle('hidden');
  }

  function copy(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      btn.innerText = "✓";
      btn.style.background = "#10b981";

      setTimeout(() => {
        btn.innerText = "⧉";
        btn.style.background = "";
      }, 1200);
    });
  }
</script>

</body>
</html>
`;
}

function renderItem(label, value) {
  const id = 'pw_' + Math.random().toString(36).slice(2);
  const safeValue = String(value).replace(/`/g, '\\`').replace(/'/g, "\\'");

  return `
    <div class="item">
      <div class="row">
        <span class="label">${label}</span>
        <div class="controls">
          <button onclick="toggle('${id}')">◉ </button>
          <button onclick="copy('${safeValue}', this)">⧉</button>
        </div>
      </div>

      <div id="${id}" class="password hidden">
        ${value}
      </div>
    </div>
  `;
}
