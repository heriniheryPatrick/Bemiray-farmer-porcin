document.addEventListener('DOMContentLoaded', function () {
    console.log("BeMiRAY Farmer - Module dynamique chargé avec succès.");

    // Exemple : Interactivité sur le bouton de calcul de ration
    const btnCalcul = document.querySelector('#alimentation button');
    if (btnCalcul) {
        btnCalcul.addEventListener('click', function (e) {
            e.preventDefault();
            alert("Calcul de la ration optimisée en cours... (Données enregistrées dynamiquement)");
        });
    }

    // Gestion dynamique de l'ajout d'un lot (depuis le bouton "Ajouter un animal/lot")
    const btnAjouter = document.querySelector('#troupeau button');
    const tbody = document.querySelector('#troupeau tbody');

    if (btnAjouter && tbody) {
        btnAjouter.addEventListener('click', function () {
            const idLot = prompt("Entrez l'identifiant du lot ou de l'animal (ex: LOT-FIN-02) :");
            const phase = prompt("Entrez la phase (ex: Finition, Croissance, Gestation) :");
            const effectif = prompt("Entrez l'effectif (ex: 30 têtes) :");
            const poids = prompt("Entrez le poids moyen (ex: 60 kg) :");

            if (idLot && phase) {
                // Création dynamique d'une nouvelle ligne dans le tableau
                const nouvelleLigne = document.createElement('tr');
                nouvelleLigne.innerHTML = `
                    <td class="p-3 font-bold text-emerald-800">${idLot}</td>
                    <td class="p-3">${phase}</td>
                    <td class="p-3">${effectif || '1 tête'}</td>
                    <td class="p-3">${poids || '0 kg'}</td>
                    <td class="p-3"><span class="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-semibold">Nouveau</span></td>
                    <td class="p-3"><a href="#" class="text-emerald-700 hover:underline">Détails</a></td>
                `;
                tbody.prepend(nouvelleLigne); // Ajoute la ligne tout en haut du tableau
            }
        });
    }
});