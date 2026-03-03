const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const user = tg.initDataUnsafe?.user;

document.getElementById("user").innerText = user
  ? `${user.first_name} (@${user.username || "—"})`
  : "Неизвестный пользователь";

// Заглушки — позже будут реальные данные
document.getElementById("status").innerText = "Нет подписки";
document.getElementById("expires").innerText = "—";

// Кнопка покупки
document.getElementById("buy").onclick = () => {
  tg.showAlert("Покупка будет доступна в следующем шаге 😉");
};
tg.MainButton.setText("Купить");
tg.MainButton.show();
tg.MainButton.onClick(() => {
  tg.showAlert("MainButton работает 💪");
});
fetch("https://forget-fotos-scholar-investors.trycloudflare.com/auth/telegram", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    initData: tg.initData
  })
})
  .then(res => res.json())
  .then(data => console.log("Backend auth:", data))
  .catch(err => console.error(err));