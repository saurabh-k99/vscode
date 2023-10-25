# Production build of vscode

### Steps to achieve production build of vscode (Use node 18.15.0)
* build **out** folder for dev
```bash
yarn watch
yarn watch-web
```

* compile dev build
```bash
yarn compile-build
```

* minify prod build
```bash
yarn minify-vscode-reh-web
```

* create a folder for prod build
```bash
mkdir vscode-prod
```

* copy following to the above folder created:
	* remote/package.json
	* extensions folder
	* product.json
	* out-vscode-reh-web-min

* rename out-vscode-reh-web-min as out

* change version in package.json to the version specified in vscode package.json

* add "commit": < latest-commit-hash > to product.json

* run yarn to install dependencies
```bash
yarn
```

* start the server
```bash
node out/server-main.js
```

* for dockerized setup copy Dockerfile to the folder created above and add this in scripts section of package.json
```json
"start-container": "node out/server-main.js --without-connection-token --host 0.0.0.0"
```
