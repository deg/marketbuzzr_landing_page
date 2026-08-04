# Front door for this repo, matching how the other projects in this workspace are
# driven. Every target here is a thin wrapper over the yarn scripts in
# package.json -- the real logic lives in scripts/deploy.mjs, which enforces the
# branch, preserved-directory and release-tag guards. Deliberately NOT duplicated
# here: two copies of a safety check are two places to forget.
#
# There is no lint or test target because this repo has neither configured.

SHELL := /bin/bash
.DEFAULT_GOAL := help

# Where published snapshots are declared. `make snapshots` reads this rather than
# restating the list, so it cannot drift.
DEPLOY_SCRIPT := scripts/deploy.mjs

.PHONY: help install dev build preview deploy-sandbox deploy-snapshot deploy-live \
        snapshots scaffolding clean

help: ## Show this help
	@echo "MarketBuzzr landing page"
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
	  | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo "Publishing a review snapshot takes four steps, in this order:"
	@echo "  1. commit your work"
	@echo "  2. git tag -a <tag> -m '...'"
	@echo "  3. add \"<tag>\" to PRESERVED_DIRS in $(DEPLOY_SCRIPT)"
	@echo "     (without it the next live deploy would delete the snapshot, so"
	@echo "      the script refuses to publish one that is not listed)"
	@echo "  4. make deploy-snapshot TAG=<tag>"
	@echo
	@echo "Expect a minute or two of GitHub Pages propagation before the URL"
	@echo "stops returning 404."

install: ## Install dependencies (Yarn 1 via corepack)
	corepack enable
	yarn install

dev: ## Run the dev server on http://localhost:5173
	yarn dev

build: ## Production build to dist/
	yarn build

preview: build ## Build, then serve dist/ locally
	yarn preview

deploy-sandbox: ## Publish the rolling sandbox -> marketbuzzr.com/new/ (any branch)
	yarn deploy:new

# TAG is required and checked here because it is a Makefile-level concern; every
# other guard belongs to the deploy script.
deploy-snapshot: ## Publish a frozen build of a git tag -> marketbuzzr.com/<TAG>/
ifndef TAG
	$(error TAG is required, e.g. `make deploy-snapshot TAG=4aug_v4`. Run `make help` for the full sequence)
endif
	yarn deploy:snapshot $(TAG)

deploy-live: ## Publish the LIVE site -> marketbuzzr.com (main branch only)
	yarn deploy

snapshots: ## List the snapshot directories the deploy script protects
	@echo "Frozen tags PRESERVED_DIRS keeps a live deploy from deleting:"
	@# Read the whole declaration, not just its first line: the list is free to
	@# wrap across lines as it grows, and a single-line grep silently printed
	@# nothing the first time it did.
	@sed -n '/const PRESERVED_DIRS/,/\]/p' $(DEPLOY_SCRIPT) \
	  | grep -oE '"[^"]+"' | tr -d '"' | sed 's/^/  /'
	@echo
	@echo "The rolling sandbox is protected too -- it is the first entry, held in"
	@echo "SANDBOX_DIR rather than written as a literal, so it does not appear above."

scaffolding: ## Show the dev-only markers that block a live deploy
	@if grep -rn "FIX-BEFORE-RELEASE" src; then \
	  echo; \
	  echo "^ these block \`make deploy-live\`. Each says what it needs; not all mean delete."; \
	else \
	  echo "No FIX-BEFORE-RELEASE markers left."; \
	fi

# dist/ and dist-*/ are both gitignored, so this can only remove build output.
clean: ## Remove build output
	rm -rf dist dist-*
