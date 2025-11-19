# Makefile — Literate Documentation Builder (CI-friendly single-repo version)

# ---- Configuration ----
REPO_URL  ?= https://github.com/qbead/SpinWearablesFirmware
SRC_DIR   ?= src
OUT_DIR   ?= .
TMP_DIR   := codedoc_tmp
FULL_OUT_DIR   := src/content/codedoc/$(OUT_DIR)
STATIC_OUT_DIR := static/codedoc/$(OUT_DIR)
SCRIPT    := tools/literate.js

# Filetypes to render — override with "make FILETYPES='h ini cpp'"
FILETYPES ?= h ino c cpp js

# ---- Phony targets ----
.PHONY: all clone docs clean

# Default target
all: docs

# ---- Targets ----

clone:
	@echo "📥 Cloning repository: $(REPO_URL)"
	@git clone --depth=1 $(REPO_URL) $(TMP_DIR) >/dev/null

clean:
	@echo "🧹 Removing generated markdown files..."
	@rm -f $(FULL_OUT_DIR)/*.md

	@echo "🧹 Removing static files..."
	@rm -rf $(STATIC_OUT_DIR)/*

docs: clone
	@echo "📘 Generating markdown documentation from $(SRC_DIR) (filetypes: $(FILETYPES))"
	@mkdir -p $(FULL_OUT_DIR)
	@mkdir -p $(STATIC_OUT_DIR)

	# Render files of given FILETYPES
	@find $(TMP_DIR)/$(SRC_DIR) -type f \( $(foreach ext,$(FILETYPES),-name '*.$(ext)' -o ) -false \) | while read -r file; do \
		echo "  → Rendering $$file → $(FULL_OUT_DIR)"; \
		bun $(SCRIPT) -v -o $(FULL_OUT_DIR) $$file; \
	done

	# Copy non-rendered files (like media) into static/codedoc with preserved structure
	@echo "📁 Copying non-rendered files into $(STATIC_OUT_DIR)..."
	@find $(TMP_DIR)/$(SRC_DIR) -type f ! \( $(foreach ext,$(FILETYPES),-name '*.$(ext)' -o ) -false \) | while read -r file; do \
		rel_path=$${file#$(TMP_DIR)/$(SRC_DIR)/}; \
		target_dir=$(STATIC_OUT_DIR)/$$(dirname $$rel_path); \
		mkdir -p $$target_dir; \
		echo "  → Copying $$file → $$target_dir"; \
		cp "$$file" "$$target_dir/"; \
	done

	@echo "✅ Documentation generation complete."
	@echo "🧹 Cleaning up temporary directory..."
	@rm -rf $(TMP_DIR)

