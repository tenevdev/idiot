# Detect Windows OS
ifdef SystemRoot
	# Fix slashes of path to work on Windows
	FixPath = $(subst /,\,$1)
else
	FixPath = $1
endif

node_modules := ./node_modules/.bin/

test: 
	$(call FixPath, $(node_modules))mocha -u tdd -R spec

.PHONY: test