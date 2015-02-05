# Detect Windows OS
ifdef SystemRoot
	# Fix slashes of path to work on Windows
	FixPath = $(subst /,\,$1)
else
	FixPath = $1
endif

NODE_MODULES = ./node_modules/.bin/
MOCHA = ./node_modules/mocha/bin/
TESTS_INTEGRATION = test/integration/
TESTS_UNIT = test/unit/
COVERAGE_REPORT = ./coverage/lcov.info
COVERALLS = ./node_modules/coveralls/bin/coveralls.js

test: test-unit test-integration

test-integration:
	$(call FixPath, $(NODE_MODULES))mocha $(TESTS_INTEGRATION)

test-unit:
	$(call FixPath, $(NODE_MODULES))mocha $(TESTS_UNIT)

test-cov: istanbul

istanbul:
	$(call FixPath, $(NODE_MODULES))istanbul cover$(call FixPath, $(MOCHA))_mocha $(TESTS_INTEGRATION) $(TESTS_UNIT)

coveralls:
	cat $(COVERAGE_REPORT) | $(COVERALLS)

.PHONY: test
