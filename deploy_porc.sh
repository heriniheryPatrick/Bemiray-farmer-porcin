#!/bin/bash
set -e

echo "=== Ajout des modifications pour le formulaire porcin ==="
git status
git add .

read -p "Entrez le message du commit (ex: Ajout du formulaire d'enregistrement porcin) : " commit_msg
commit_msg=${commit_msg:-"Ajout du formulaire d'enregistrement de porcs"}

git commit -m "$commit_msg"
git push origin main

echo "=== Déploiement terminé avec succès ! ==="
