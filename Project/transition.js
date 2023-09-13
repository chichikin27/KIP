
document.getElementById('themeToggle').addEventListener('click', function() {
    const body = document.body;

    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
});

// Установка темы при загрузке страницы в зависимости от сохраненного значения
const savedTheme = localStorage.getItem('theme');
if (savedTheme && savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}