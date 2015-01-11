# Detect Windows OS
ifdef SystemRoot
	# Fix slashes of path to work on Windows
	FixPath = $(subst /,\,$1)
else
	FixPath = $1
endif

node_modules := ./node_modules/.bin/
mocha_bin := ./node_modules/mocha/bin/

test: 
	$(call FixPath, $(node_modules))mocha

test-cov:
	$(call FixPath, $(node_modules))istanbul cover$(call FixPath, $(mocha_bin))_mocha

.PHONY: test