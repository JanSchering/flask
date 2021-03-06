build:
	export NODE_ENV="development"
	rm -R $(shell pwd)/app/static/bundles
	npm run dev
	flask run
