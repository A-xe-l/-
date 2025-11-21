document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("hours");
    const result = document.getElementById("result");
    let myChart; // чтобы менять график

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let work = Number(document.getElementById("work").value);
        let study = Number(document.getElementById("study").value);
        let games = Number(document.getElementById("games").value);
        let relax = Number(document.getElementById("relax").value);

        let total = work + study + games + relax;

        if (total > 24) {
            result.textContent = "Ошибка! Общее время не может быть больше 24 часов!";
            return;
        }
        if (total === 0) {
            result.textContent = "Введите хотя бы 1 час!";
            return;
        }

        let productive = work + study;
        let unproductive = games + relax;

        let productivePercent = Math.round((productive / total) * 100);
        let unproductivePercent = Math.round((unproductive / total) * 100);

        result.style.color = "black";
        result.innerHTML = `
            <strong>Продуктивность:</strong> ${productivePercent}%<br>
            <strong>Непродуктивность:</strong> ${unproductivePercent}%`;

        // 🔷 Обновление диаграммы
        let data = [work, study, games, relax];

        if (myChart) myChart.destroy();  // убираем старую диаграмму

        myChart = new Chart(document.getElementById("myChart"), {
            type: "pie",
            data: {
                labels: ["Работа", "Учеба", "Игры", "Отдых"],
                datasets: [{
                    data: data,
                    backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#E91E63"]
                }]
            }
        });
    });
});
