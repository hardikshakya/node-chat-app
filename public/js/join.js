document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('joinForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const room = document.getElementById('room').value;

    window.location.href = `/chat.html?name=${encodeURIComponent(
      name
    )}&room=${encodeURIComponent(room)}`;
  });
});
