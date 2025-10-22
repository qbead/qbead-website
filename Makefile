# Makefile — Literate Documentation Builder (CI-friendly single-repo version)

# ---- Configuration ----
REPO_URL  ?= https://github.com/qbead/SpinWearablesFirmware
SRC_DIR   ?= src
TMP_DIR   := codedoc_tmp
OUT_DIR   := src/routes/codedoc/literate
SCRIPT    := tools/literate.js

# Filetypes to render — override with "make FILETYPES='h ini cpp'"
FILETYPES ?= h ino c cpp

# ---- Phony targets ----
.PHONY: all clone docs clean

# Default target
all: docs

# ---- Targets ----

# Clone the specified repo into a temporary directory
clone:
	@echo "📥 Cloning repository: $(REPO_URL)"
	@git clone --depth=1 $(REPO_URL) $(TMP_DIR) >/dev/null

# Generate documentation
docs: clone
	@echo "📘 Generating markdown documentation from $(SRC_DIR) (filetypes: $(FILETYPES))"
	@mkdir -p $(OUT_DIR)
	@find $(TMP_DIR)/$(SRC_DIR) -type f \( $(foreach ext,$(FILETYPES),-name '*.$(ext)' -o ) -false \) | while read -r file; do \
		echo "  → $$file → $(OUT_DIR)"; \
		bun $(SCRIPT) -v -o $(OUT_DIR) $$file; \
	done
	@echo "✅ Documentation generation complete."
	@echo "🧹 Cleaning up temporary directory..."
	@rm -rf $(TMP_DIR)

# Remove generated markdown files
clean:
	@echo "🧹 Removing generated markdown files..."
	@rm -f $(OUT_DIR)/*.md
