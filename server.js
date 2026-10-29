// Импортируем библиотеку для создания SOCKS5 сервера
const socks5 = require('simple-socks');

// Создаем сервер с авторизацией по логину и паролю (чтобы чужие люди не пользовались)
const server = socks5.createServer({
  authenticate: function (username, password, callback) {
    // Впишите сюда свои логин и пароль
    if (username === 'myuser' && password === 'mypassword123') {
      return callback(null, true); // Доступ разрешен
    }
    return callback(null, false); // Доступ запрещен
  }
});

// Запускаем сервер на порту 1080 (стандартный порт для SOCKS)
const PORT = process.env.PORT || 1080;
server.listen(PORT, () => {
  console.log(`Прокси-сервер успешно запущен на порту ${PORT}`);
});

// Обработка ошибок, чтобы сервер не падал
server.on('error', (err) => {
  console.error('Ошибка сервера:', err);
});
