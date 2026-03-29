export const loginView = (error) => `
  <h2 style="text-align:center; margin-top:0">🔒 Вход</h2>
  <form method="POST" novalidate>
    <input 
      type="password" 
      name="password" 
      placeholder="Введите пароль доступа" 
      autofocus 
      style="
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 2px solid ${error ? '#ef4444' : '#e5e7eb'};
        border-radius: 6px;
        outline: none;
        transition: border-color 0.2s;
      "
      oninput="this.style.borderColor='#e5e7eb'"
    />
    <button type="submit" class="btn-primary">Войти</button>
  </form>
`;
