- git checkout -b update-9
- yarn
- yarn buildFrontend
- yarn add @angular/cli@^8.3.15
- git commit -m "add latest 8.x cli"
- ng update @angular/cli @angular/core --next

```
kamik@RED-X1C6 MINGW64 /d/sandbox/super-productivity (update-9)
$ ng update @angular/cli @angular/core --next
The installed Angular CLI version is older than the latest published version.
Installing a temporary version to perform the update.
Installing packages for tooling via npm.
C:\Users\kamik\AppData\Local\Temp\.ng-temp-packages-qD4bvL\ng -> C:\Users\kamik\AppData\Local\Temp\.ng-temp-packages-qD4bvL\node_modules\@angular\cli\bin\ng

> @angular/cli@9.0.0-rc.0 postinstall C:\Users\kamik\AppData\Local\Temp\.ng-temp-packages-qD4bvL\node_modules\@angular\cli
> node ./bin/postinstall/script.js

+ @angular/cli@9.0.0-rc.0
added 254 packages from 205 contributors in 19.356s
Installed packages for tooling via npm.
Using package manager: 'npm'
Collecting installed dependencies...
Found 87 dependencies.
Fetching dependency metadata from registry...
                  Package "@angular/core" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@ngx-translate/core" has an incompatible peer dependency to "@angular/core" (requires ">=7.0.0", would install "9.0.0-rc.0").
                  Package "@angular/common" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@ngx-translate/http-loader" has an incompatible peer dependency to "@angular/common" (requires ">=7.0.0", would install "9.0.0-rc.0").
                  Package "@angular/platform-browser" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/compiler" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/animations" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/forms" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@ngx-formly/core" has an incompatible peer dependency to "@angular/forms" (requires ">=7.0.0", would install "9.0.0-rc.0").
                  Package "@angular/compiler-cli" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/platform-browser-dynamic" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/platform-server" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/router" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/service-worker" has a missing peer dependency of "tslib" @ "^1.10.0".
Incompatible peer dependencies found.
Peer dependency warnings when installing dependencies means that those dependencies might not work correctly together.
You can use the '--force' option to ignore incompatible peer dependencies and instead address these warnings later.
```

- seems tslib is a new peerdep, we have a migration but the peerdep check happens before migrations, so users will always need to do `--force`
