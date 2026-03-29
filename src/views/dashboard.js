export const dashboardView = (allowed, data) => {
  if (!allowed) {
    return `
      <div style="text-align:center; opacity:0.6; padding: 20px 0;">
        <div style="font-size: 40px;">⌛</div>
        <p>Доступ закрыт.<br>Приходите с 04:00 до 05:00</p>
      </div>
      <div class="footer">Timezone: Europe/Lisbon</div>
    `;
  }

  const renderItem = (label, value) => {
    const id = 'pw_' + Math.random().toString(36).slice(2, 7);
    return `
      <div class="item">
        <div class="row">
          <span style="font-size:13px; opacity:0.7">${label}</span>
          <div>
            <button onclick="toggle('${id}')">◉</button>
            <button onclick="copy('${value}', this)">⧉</button>
          </div>
        </div>
        <div id="${id}" class="password hidden">${value}</div>
      </div>`;
  };

  return `
    <h3 style="margin-top:0; text-align:center">Somnus</h3>
    ${renderItem('Mail 1', data.mail1)}
    ${renderItem('Mail 2', data.mail2)}
    ${renderItem('Cloudflare', data.cloudflare)}
    ${renderItem('Screen Time', data.screen)}
    <div class="footer">Сессия активна 1 час</div>
  `;
};
