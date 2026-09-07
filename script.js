document.addEventListener('DOMContentLoaded', function() {
    // Graphique de croissance porcine
    const ctx = document.getElementById('porcineChart').getContext('2d');
    const porcineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4', 'Semaine 5', 'Semaine 6'],
            datasets: [{
                label: 'Poids moyen (kg)',
                data: [50, 53.5, 57, 61, 64.5, 68.4],
                borderColor: '#2e7d32',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: '#f0f0f0' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // Gestion du formulaire d'enregistrement
    const form = document.getElementById('recordForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const lot = document.getElementById('lot').value;
        const weight = document.getElementById('weight').value;

        if(date && lot && weight) {
            alert(`Pesée enregistrée avec succès !\nDate : ${date}\nLot : ${lot}\nPoids moyen : ${weight} kg`);
            form.reset();
        }
    });

    // Date du jour par défaut dans le formulaire
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date');
    if(dateInput) {
        dateInput.value = today;
    }
});
