#!/bin/bash
git restore .DS_Store 2>/dev/null
git add index.html logo-bemiray.jpg
git commit -m "Ajout des onglets Traitements Sanitaires & Reproduction/Maternité avec logo officiel"
git push origin main
echo "Mise à jour et push Git terminés avec succès !"
