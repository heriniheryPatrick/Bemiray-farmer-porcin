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

    // Simulateur expert de provende avec tous les ingrédients malgaches
    function calculateFormulation() {
        const qMais = parseFloat(document.getElementById('q_mais').value) || 0;
        const qManioc = parseFloat(document.getElementById('q_manioc').value) || 0;
        const qSon = parseFloat(document.getElementById('q_son').value) || 0;
        const qApombo = parseFloat(document.getElementById('q_apombo').value) || 0;
        const qDreche = parseFloat(document.getElementById('q_dreche').value) || 0;
        const qSoja = parseFloat(document.getElementById('q_soja').value) || 0;
        const qArachide = parseFloat(document.getElementById('q_arachide').value) || 0;
        const qPoisson = parseFloat(document.getElementById('q_poisson').value) || 0;
        const qCalcium = parseFloat(document.getElementById('q_calcium').value) || 0;
        const qPremix = parseFloat(document.getElementById('q_premix').value) || 0;

        const totalKg = qMais + qManioc + qSon + qApombo + qDreche + qSoja + qArachide + qPoisson + qCalcium + qPremix;
        const alertDiv = document.getElementById('totalKgAlert');
        
        if (totalKg === 100) {
            alertDiv.textContent = `Total : ${totalKg} kg ✅ (Mélange 100% équilibré)`;
            alertDiv.style.background = '#e8f5e9';
            alertDiv.style.color = '#1b5e20';
        } else {
            alertDiv.textContent = `Total : ${totalKg} kg ⚠️ (Le total doit être strictement égal à 100 kg)`;
            alertDiv.style.background = '#ffebee';
            alertDiv.style.color = '#c62828';
        }

        // Teneurs nutritionnelles estimées (Protéines % et Calcium %) :
        // Maïs: 9% P, 0.02% Ca | Manioc: 2% P, 0.1% Ca | Son: 12% P, 0.08% Ca | Apombo: 13% P, 0.1% Ca
        // Drêche: 22% P, 0.2% Ca | Soja: 44% P, 0.3% Ca | Arachide (Voanjo): 40% P, 0.2% Ca
        // Poudre de poisson: 60% P, 5% Ca | Coquille d'huître: 0% P, 38% Ca | Prémix: 10% P, 15% Ca
        const protTotal = (qMais * 0.09) + (qManioc * 0.02) + (qSon * 0.12) + (qApombo * 0.13) + 
                          (qDreche * 0.22) + (qSoja * 0.44) + (qArachide * 0.40) + (qPoisson * 0.60) + 
                          (qCalcium * 0.0) + (qPremix * 0.10);

        const calcTotal = (qMais * 0.0002) + (qManioc * 0.001) + (qSon * 0.0008) + (qApombo * 0.001) + 
                          (qDreche * 0.002) + (qSoja * 0.003) + (qArachide * 0.002) + (qPoisson * 0.05) + 
                          (qCalcium * 0.38) + (qPremix * 0.15);

        // Prix unitaires indicatifs à Madagascar (Ar / kg) :
        // Maïs: 1400 | Manioc: 900 | Son: 700 | Apombo: 650 | Drêche: 800 | Soja: 2800 | Arachide: 3200 | Poisson: 5000 | Calcium: 600 | Prémix: 6500
        const totalCost = (qMais * 1400) + (qManioc * 900) + (qSon * 700) + (qApombo * 650) + 
                          (qDreche * 800) + (qSoja * 2800) + (qArachide * 3200) + (qPoisson * 5000) + 
                          (qCalcium * 600) + (qPremix * 6500);

        const costPerKg = totalKg > 0 ? totalCost / totalKg : 0;

        document.getElementById('resMatiereSeche').textContent = totalKg + ' kg';
        document.getElementById('resProteines').textContent = protTotal.toFixed(1) + ' %';
        document.getElementById('resCalcium').textContent = calcTotal.toFixed(2) + ' %';
        document.getElementById('resCost').textContent = totalCost.toLocaleString('fr-FR') + ' Ar';
        document.getElementById('resCostPerKg').textContent = Math.round(costPerKg).toLocaleString('fr-FR') + ' Ar / kg';
        
        const headerCost = document.getElementById('headerCostKg');
        if(headerCost) headerCost.textContent = Math.round(costPerKg) + ' Ar';
    }

    document.querySelectorAll('.ing-input').forEach(input => {
        input.addEventListener('input', calculateFormulation);
    });
    calculateFormulation();

    // Formulaire d'enregistrement
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
