document.addEventListener('DOMContentLoaded', function() {
    // Graphique de croissance
    const ctx = document.getElementById('porcineChart').getContext('2d');
    new Chart(ctx, {
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
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: false, grid: { color: '#f0f0f0' } }, x: { grid: { display: false } } }
        }
    });

    // Simulateur de formulation
    function calculateFormulation() {
        const qMais = parseFloat(document.getElementById('q_mais').value) || 0;
        const qSon = parseFloat(document.getElementById('q_son').value) || 0;
        const qSoja = parseFloat(document.getElementById('q_soja').value) || 0;
        const qLfl = parseFloat(document.getElementById('q_lfl').value) || 0;

        const totalKg = qMais + qSon + qSoja + qLfl;
        const alertDiv = document.getElementById('totalKgAlert');
        
        if (totalKg === 100) {
            alertDiv.textContent = `Total : ${totalKg} kg ✅ (Équilibré)`;
            alertDiv.style.background = '#e8f5e9';
            alertDiv.style.color = '#1b5e20';
        } else {
            alertDiv.textContent = `Total : ${totalKg} kg ⚠️ (Le total doit être égal à 100 kg)`;
            alertDiv.style.background = '#ffebee';
            alertDiv.style.color = '#c62828';
        }

        const totalCost = (qMais * 1400) + (qSon * 700) + (qSoja * 2800) + (qLfl * 4500);
        const costPerKg = totalKg > 0 ? totalCost / totalKg : 0;

        document.getElementById('resCost').textContent = totalCost.toLocaleString('fr-FR') + ' Ar';
        document.getElementById('resCostPerKg').textContent = Math.round(costPerKg).toLocaleString('fr-FR') + ' Ar / kg';
        
        const headerCost = document.getElementById('headerCostKg');
        if(headerCost) headerCost.textContent = Math.round(costPerKg) + ' Ar';
    }

    document.querySelectorAll('.ing-input').forEach(input => {
        input.addEventListener('input', calculateFormulation);
    });
    calculateFormulation();

    // Formulaire d'enregistrement d'événements
    const form = document.getElementById('recordForm');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const date = document.getElementById('date').value;
            const type = document.getElementById('eventType').value;
            const lot = document.getElementById('lot').value;
            const details = document.getElementById('details').value;

            if(date && lot && details) {
                alert(`Événement enregistré avec succès !\nType : ${type}\nRéférence : ${lot}\nDétails : ${details}`);
                form.reset();
                document.getElementById('date').value = new Date().toISOString().split('T')[0];
            }
        });
    }

    const dateInput = document.getElementById('date');
    if(dateInput) dateInput.value = new Date().toISOString().split('T')[0];
});
