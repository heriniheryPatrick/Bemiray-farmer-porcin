#!/bin/bash
set -e
echo "=== Début de la mise à jour ==="
git status
git add .
read -p "Entrez le message du commit : " commit_message
commit_message=${commit_message:-"Fix pop-up planifier un soin"}
git commit -m "$commit_message"
git push origin main
echo "=== Terminé ! ==="Verify: Exécutez ls -l update_site.sh pour vérifier que le fichier est bien présent et listé.
