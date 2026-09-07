document.addEventListener('DOMContentLoaded', function() {
    // Graphique d'évolution de la croissance porcine
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
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: false, grid: { color: '#f0f0f0' } },
                x: { grid: { display: false } }
            }
        }
    });

    // Simulateur de formulation & coûts (style Afaporc)
    function calculateFormulation() {
        const qMais = parseFloat(document.getElementById('q_mais').value) || 0;
        const qSon = parseFloat(document.getElementById('q_son').value) || 0;
        const qSoja = parseFloat(document.getElementById('q_soja').value) || 0;
        const qLfl = parseFloat(document.getElementById('q_lfl').value) || 0;

        const totalKg = qMais + qSon + qSoja + qLfl;

        const alertDiv = document.getElementById('totalKgAlert');
        if (totalKg === 100) {
            alertDiv.textContent = `Total : ${totalKg} kg ✅ (Base 100 kg parfaite)`;
            alertDiv.style.background = '#e8f5e9';
            alertDiv.style.color = '#1b5e20';
        } else {
            alertDiv.textContent = `Total : ${totalKg} kg ⚠️ (Le total doit être égal à 100 kg)`;
            alertDiv.style.background = '#ffebee';
            alertDiv.style.color = '#c62828';
        }

        // Prix unitaires estimés en Ariary (Ar) par kg
        const pMais = 1400;
        const pSon = 700;
        const pSoja = 2800;
        const pLfl = 4500;

        const totalCost = (qMais * pMais) + (qSon * pSon) + (qSoja * pSoja) + (qLfl * pLfl);
        const costPerKg = totalKg > 0 ? totalCost / totalKg : 0;

        document.getElementById('resCost').textContent = totalCost.toLocaleString('fr-FR') + ' Ar';
        document.getElementById('resCostPerKg').textContent = Math.round(costPerKg).toLocaleString('fr-FR') + ' Ar / kg';
    }

    // Écouteurs sur les inputs du simulateur
    const inputs = document.querySelectorAll('.ing-input');
    inputs.forEach(input => {
        input.addEventListener('input', calculateFormulation);
    });

    const btnRecalc = document.getElementById('btnRecalc');
    if(btnRecalc) {
        btnRecalc.addEventListener('click', calculateFormulation);
    }

    // Calcul initial au chargement
    calculateFormulation();

    // Formulaire d'enregistrement dynamique de pesée
    const form = document.getElementById('recordForm');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const date = document.getElementById('date').value;
            const lot = document.getElementById('lot').value;
            const weight = document.getElementById('weight').value;

            if(date && lot && weight) {
                alert(`Pesée enregistrée avec succès !\nDate : ${date}\nLot : ${lot}\nPoids moyen : ${weight} kg`);
                form.reset();
                document.getElementById('date').value = new Date().toISOString().split('T')[0];
            }
        });
    }

    // Date du jour par défaut
    const dateInput = document.getElementById('date');
    if(dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
});
