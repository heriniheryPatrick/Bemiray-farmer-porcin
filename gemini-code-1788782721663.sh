#!/bin/bash

# Ignorer ou nettoyer les fichiers indésirables (comme .DS_Store sur Mac)
git restore .DS_Store 2>/dev/null

# Ajouter le fichier index.html modifié
git add index.html

# Créer le commit avec un message descriptif
git commit -m "Mise à jour des listes déroulantes ingrédients et profils utilisateurs"

# Pousser les modifications vers le dépôt distant
git push origin main

echo "Opération terminée avec succès !"