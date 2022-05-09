# Projet test d'api

## Installation
Faites un **npm install** dans le container "api". Voir la section "Commandes/Install dependencies".

## Commandes

We define an alias for execution in compose services
`alias dcexec="docker-compose exec"`

### Install dependencies
dcexec api npm install

### Recreate the database
dcexec api npm run db:fresh