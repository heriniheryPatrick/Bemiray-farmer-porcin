function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', function() {
    let ingredients = [
        { name: "Maïs concassé", qty: 38, price: 1400, prot: 9.0, calc: 0.02 },
        { name: "Farine de manioc", qty: 10, price: 900, prot: 2.0, calc: 0.1 },
        { name: "Son de riz (Vary ℜ)", qty: 15, price: 700, prot: 12.0, calc: 0.08 },
        { name: "Apombo malemy", qty: 10, price: 650, prot: 13.0, calc: 0.1 },
        { name: "Drêche de bière", qty: 5, price: 800, prot: 22.0, calc: 0.2 },
        { name: "Tourteau de Soja", qty: 10, price: 2800, prot: 44.0, calc: 0.3 },
        { name: "Tourteau d'Arachide (Voanjo)", qty: 5, price: 3200, prot: 40.0, calc: 0.2 },
        { name: "Poudre de poisson", qty: 4, price: 5000, prot: 60.0, calc: 5.0 },
        { name: "Coquille d'huître", qty: 1, price: 600, prot: 0.0, calc: 38.0 },
        { name: "Prémix / Minéraux", qty: 2, price: 6500, prot: 10.0, calc: 15.0 }
    ];

    const tableBody = document.getElementById('ingredientsTableBody');

    function renderIngredients() {
        if (!tableBody) return;
        tableBody.innerHTML = '';
        ingredients.forEach((ing, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="ing-name" value="${ing.name}" data-index="${index}" data-field="name"></td>
                <td><input type="number" step="0.5" min="0" max="100" class="ing-qty" value="${ing.qty}" data-index="${index}" data-field="qty"></td>
                <td><input type="number" step="50" min="0" class="ing-price" value="${ing.price}" data-index="${index}" data-field="price"></td>
                <td><input type="number" step="0.1" min="0" max="100" class="ing-prot" value="${ing.prot}" data-index="${index}" data-field="prot"></td>
                <td><input type="number" step="0.01" min="0" max="100" class="ing-calc" value="${ing.calc}" data-index="${index}" data-field="calc"></td>
                <td><button type="button" class="btn-delete" data-index="${index}">✕</button></td>
            `;
            tableBody.appendChild(tr);
        });
        attachTableEvents();
        calculateFormulation();
    }

    function attachTableEvents() {
        document.querySelectorAll('.formulation-table input').forEach(input => {
            input.addEventListener('input', function() {
                const idx = parseInt(this.getAttribute('data-index'));
                const field = this.getAttribute('data-field');
                let val = this.value;
                if (field !== 'name') val = parseFloat(val) || 0;
                ingredients[idx][field] = val;
                calculateFormulation();
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.getAttribute('data-index'));
                ingredients.splice(idx, 1);
                renderIngredients();
            });
        });
    }

    const addIngBtn = document.getElementById('addIngBtn');
    if (addIngBtn) {
        addIngBtn.addEventListener('click', function() {
            ingredients.push({ name: "Nouvel ingrédient", qty: 0, price: 1000, prot: 10.0, calc: 0.1 });
            renderIngredients();
        });
    }

    function calculateFormulation() {
        let totalQty = 0;
        let totalCost = 0;
        let weightedProt = 0;
        let weightedCalc = 0;

        ingredients.forEach(ing => {
            const q = parseFloat(ing.qty) || 0;
            const p = parseFloat(ing.price) || 0;
            const pr = parseFloat(ing.prot) || 0;
            const ca = parseFloat(ing.calc) || 0;

            totalQty += q;
            totalCost += q * p;
            weightedProt += q * pr;
            weightedCalc += q * ca;
        });

        const alertDiv = document.getElementById('totalKgAlert');
        if (alertDiv) {
            if (Math.abs(totalQty - 100) < 0.01) {
                alertDiv.textContent = `Total : ${totalQty} kg ✅ (Base 100 kg parfaite)`;
                alertDiv.style.background = '#e8f5e9';
                alertDiv.style.color = '#1b5e20';
            } else {
                alertDiv.textContent = `Total : ${totalQty} kg ⚠️ (Le total doit être de 100 kg)`;
                alertDiv.style.background = '#ffebee';
                alertDiv.style.color = '#c62828';
            }
        }

        const avgProt = totalQty > 0 ? weightedProt / totalQty : 0;
        const avgCalc = totalQty > 0 ? weightedCalc / totalQty : 0;
        const costPerKg = totalQty > 0 ? totalCost / totalQty : 0;

        const resMatiereSeche = document.getElementById('resMatiereSeche');
        if (resMatiereSeche) resMatiereSeche.textContent = totalQty.toFixed(1) + ' kg';
        
        const resProteines = document.getElementById('resProteines');
        if (resProteines) resProteines.textContent = avgProt.toFixed(1) + ' %';
        
        const resCalcium = document.getElementById('resCalcium');
        if (resCalcium) resCalcium.textContent = avgCalc.toFixed(2) + ' %';
        
        const resCost = document.getElementById('resCost');
        if (resCost) resCost.textContent = totalCost.toLocaleString('fr-FR') + ' Ar';
        
        const resCostPerKg = document.getElementById('resCostPerKg');
        if (resCostPerKg) resCostPerKg.textContent = Math.round(costPerKg).toLocaleString('fr-FR') + ' Ar / kg';
    }

    renderIngredients();

    // Modale "Ajouter un porc"
    const modal = document.getElementById('porcModal');
    const openBtn = document.getElementById('openAddPorcModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const addPorcForm = document.getElementById('addPorcForm');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
    }
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    }
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    if (addPorcForm) {
        addPorcForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('porcId').value;
            const category = document.getElementById('porcCategory').value;
            const poids = document.getElementById('porcPoids').value;
            const enclos = document.getElementById('porcEnclos').value;

            const tbody = document.getElementById('cheptelTableBody');
            if (tbody) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td><strong>${id}</strong></td>
                    <td>${category}</td>
                    <td>--</td>
                    <td>${poids} kg</td>
                    <td>${enclos}</td>
                    <td><span class="badge-status success">Nouveau / Actif</span></td>
                `;
                tbody.prepend(newRow);
            }

            alert(`Porc / Lot "${id}" ajouté avec succès au registre !`);
            addPorcForm.reset();
            modal.style.display = 'none';
        });
    }
});
