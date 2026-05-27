.PHONY: help setup dev build stop logs migrate studio clean

help:
	@echo "Tarotowy Portret — Common Commands"
	@echo "===================================="
	@echo "  make setup              Run full project initialization"
	@echo "  make dev                Start services (docker compose up)"
	@echo "  make build              Build Docker image"
	@echo "  make stop               Stop all services"
	@echo "  make logs               Tail service logs"
	@echo "  make migrate            Run Prisma migrations"
	@echo "  make studio             Open Prisma Studio (localhost:5555)"
	@echo "  make clean              Remove containers, volumes, and .next"
	@echo "  make db-connect         Connect to PostgreSQL directly"

setup:
	@bash setup.sh

dev:
	@docker compose up

build:
	@docker compose build

stop:
	@docker compose down

logs:
	@docker compose logs -f app

migrate:
	@npm run prisma:migrate

studio:
	@npm run prisma:studio

clean:
	@docker compose down -v
	@rm -rf .next node_modules
	@echo "Cleaned."

db-connect:
	@docker exec -it tarot_postgres psql -U postgres -d tarot_db

db-health:
	@docker exec tarot_postgres pg_isready -U postgres -d tarot_db

.DEFAULT_GOAL := help
