# Makefile — Literate Documentation Builder

# ---- Configuration ----
REPO_URL := https://github.com/qbead/SpinWearablesFirmware
TMP_DIR := codedoc_tmp
SRC_DIR := $(TMP_DIR)/src
OUT_DIR := src/routes/codedoc/literate
SCRIPT := tools/literate.js

# Filetypes to render — override with "make FILETYPES='h ini cpp'"
FILETYPES   ?= h ino c cpp

# ---- Phony targets ----
.PHONY: all clone docs clean

# Default target
all: docs

# Clone the repo into a temporary directory
clone:
	@echo "📥 Cloning repository into temporary directory..."
	@git clone --depth=1 $(REPO_URL) $(TMP_DIR) >/dev/null

# Generate documentation for configured filetypes
docs: clone
	@echo "📘 Generating markdown documentation for filetypes: $(FILETYPES)"
	@mkdir -p $(OUT_DIR)
	@find $(SRC_DIR) -type f \( $(foreach ext,$(FILETYPES),-name '*.$(ext)' -o ) -false \) | while read -r file; do \
		base=$$(basename $$file); \
		out=$(OUT_DIR); \
		echo "  → $$file → $$out"; \
		bun $(SCRIPT) -v -o $$out $$file; \
	done
	@echo "✅ Documentation generation complete."
	@echo "🧹 Cleaning up temporary directory..."
	@rm -rf $(TMP_DIR)

# Remove generated markdown files
clean:
	@echo "🧹 Removing generated markdown files..."
	@rm -f $(OUT_DIR)/*.md