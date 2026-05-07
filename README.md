# 🌙 Somnus  
Somnus — это инструмент цифрового самоконтроля на базе Cloudflare Workers. Он блокирует доступ к вашим паролям и кодам Screen Time, выдавая их только в самое «неудобное» время (например, в 4 утра), когда тяга к бесцельному использованию гаджетов минимальна.

<br>

## 🎯 Концепция  
В отличие от менеджеров паролей, Somnus защищает данные не от хакеров, а от ваших собственных привычек:  
* **Изоляция**: Храните здесь пароли от Cloudflare и почт, чтобы не иметь возможности мгновенно изменить настройки (**Нельзя хранить чувствительные пароли**).  
* **Анти-срыв**: Окно доступа открывается в `04:00 (Lisbon Time)`. Если вам действительно нужны данные для работы — вы дождетесь утра. Если это минутная слабость — она пройдет.

<br>

## 🛠 Установка и запуск
1. **Создайте Worker** в панели Cloudflare
2. **Добавьте секреты (Environment Variables)**:
- `AUTH_PASSWORD`: Ваш токен для авторизации (Bearer)
3. **Rate Limiting**: Подключите `MY_RATE_LIMITER`
4. **Деплой**: Скопируйте код и разверните через Wrangler.
5. **KV namespace** С помощью API сохраните пароли:
- `MAIL_PASSWORD`: Пароли от почт для регистрации в Cloudflare (_лучше создать специальную почту_)
- `CF_PASSWORD`: Пароль от аккаунта Cloudflare
- `SCREEN_CODE`: Код экранного времени

<br>

## 🚀 API

```bash
# Получить список всех ключей
curl -X GET "http://localhost:8787/kv" -H "Authorization: Bearer 1234-4567-7890"
```
```bash
# Получить kv по name
curl -X GET "http://localhost:8787/kv/{name}" -H "Authorization: Bearer 1234-4567-7890"
```
```bash
# Создать новый kv
curl -X POST "http://localhost:8787/kv" -H "Authorization: Bearer 1234-4567-7890" -H "Content-Type: application/json" -d '{"key":"name", "value":"Cloudflare"}'
```
```bash
# Обновить value в kv по name
curl -X PUT "http://localhost:8787/kv/{name}" -H "Authorization: Bearer 1234-4567-7890" -H "Content-Type: application/json" -d '{"value":"NewValue"}'
```
```bash
# Удалить kv по name
curl -X DELETE "http://localhost:8787/kv/{name}" -H "Authorization: Bearer 1234-4567-7890"
```

<br>

## ⚙️ Логика доступа
* **Временная зона**: `Europe/Lisbon`
* **Окно доступа**: строго с `04:00` до `04:59`.  
**Внимание**: Не забудьте выйти из аккаунта Cloudflare и удалить пароли из браузера после настройки, иначе смысл изоляции теряется.
