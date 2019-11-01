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

- OBS: seems tslib is a new peerdep, we have a migration but the peerdep check happens before migrations, so users will always need to do `--force`
- OBS: these warnings should not have stopped the update process, the missing ones shouldn't stop and the incompatible ones should match with `--next` (AI: Filipe)
- migration fails on ngcc

```
kamik@RED-X1C6 MINGW64 /d/sandbox/super-productivity (update-9)
$ ng update @angular/cli @angular/core --next --force
The installed Angular CLI version is older than the latest published version.
Installing a temporary version to perform the update.
Installing packages for tooling via npm.
C:\Users\kamik\AppData\Local\Temp\.ng-temp-packages-Xmt0sz\ng -> C:\Users\kamik\AppData\Local\Temp\.ng-temp-packages-Xmt0sz\node_modules\@angular\cli\bin\ng

> @angular/cli@9.0.0-rc.0 postinstall C:\Users\kamik\AppData\Local\Temp\.ng-temp-packages-Xmt0sz\node_modules\@angular\cli
> node ./bin/postinstall/script.js

+ @angular/cli@9.0.0-rc.0
added 254 packages from 205 contributors in 17.661s
Installed packages for tooling via npm.
Using package manager: 'npm'
Collecting installed dependencies...
Found 87 dependencies.
Fetching dependency metadata from registry...
                  Package "@angular/core" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@ngx-translate/core" has an incompatible peer dependency to "@angular/core" (requires ">=7.0.0", would install "9.0.0-rc.0").
                  Package "@angular/common" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@ngx-translate/http-loader" has an incompatible peer dependency to "@angular/common" (requires ">=7.0.0", would install "9.0.0-rc.0").
                  Package "@angular/animations" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/forms" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@ngx-formly/core" has an incompatible peer dependency to "@angular/forms" (requires ">=7.0.0", would install "9.0.0-rc.0").
                  Package "@angular/compiler" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/platform-browser" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/compiler-cli" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/service-worker" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/platform-server" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/router" has a missing peer dependency of "tslib" @ "^1.10.0".
                  Package "@angular/platform-browser-dynamic" has a missing peer dependency of "tslib" @ "^1.10.0".
    Updating package.json with dependency @angular/cli @ "9.0.0-rc.0" (was "8.3.17")...
    Updating package.json with dependency @angular/core @ "9.0.0-rc.0" (was "8.2.9")...
    Updating package.json with dependency @angular/common @ "9.0.0-rc.0" (was "8.2.9")...
    Updating package.json with dependency @angular/animations @ "9.0.0-rc.0" (was "8.2.9")...
    Updating package.json with dependency @angular/forms @ "9.0.0-rc.0" (was "8.2.9")...
    Updating package.json with dependency @angular/language-service @ "9.0.0-rc.0" (was "8.2.9")...
    Updating package.json with dependency @angular/compiler @ "9.0.0-rc.0" (was "8.2.9")...
    Updating package.json with dependency @angular/platform-browser @ "9.0.0-rc.0" (was "8.2.9")...
    Updating package.json with dependency @angular/compiler-cli @ "9.0.0-rc.0" (was "8.2.9")...
    Updating package.json with dependency @angular/service-worker @ "9.0.0-rc.0" (was "8.2.9")...
    Updating package.json with dependency @angular/platform-server @ "9.0.0-rc.0" (was "8.2.9")...
    Updating package.json with dependency @angular/router @ "9.0.0-rc.0" (was "8.2.9")...
    Updating package.json with dependency @angular/platform-browser-dynamic @ "9.0.0-rc.0" (was "8.2.9")...
    Updating package.json with dependency @angular-devkit/build-angular @ "0.900.0-rc.0" (was "0.803.4")...
    Updating package.json with dependency zone.js @ "0.10.2" (was "0.9.1")...
    Updating package.json with dependency typescript @ "3.6.4" (was "3.5.3")...
UPDATE package.json (6816 bytes)
√ Packages installed successfully.
** Executing migrations of package '@angular/cli' **

>  Update an Angular CLI project to version 9.
UPDATE angular.json (4412 bytes)
UPDATE src/tsconfig.app.json (200 bytes)
UPDATE package.json (6812 bytes)
√ Packages installed successfully.
√  Migration succeeded.

>  Update lazy loading syntax to use dynamic imports.
√  Migration succeeded.

** Executing migrations of package '@angular/core' **

>  Static flag migration.
   Removes the `static` flag from dynamic queries.
   As of Angular 9, the "static" flag defaults to false and is no longer required for your view and content queries.
   Read more about this here: https://v9.angular.io/guide/migration-dynamic-flag
UPDATE src/app/ui/inline-markdown/inline-markdown.component.ts (5025 bytes)
UPDATE src/app/ui/inline-input/inline-input.component.ts (1595 bytes)
UPDATE src/app/core/banner/banner/banner.component.ts (1728 bytes)
UPDATE src/app/features/tasks/task/task.component.ts (18537 bytes)
UPDATE src/app/features/bookmark/bookmark-bar/bookmark-bar.component.ts (3188 bytes)
UPDATE src/app/features/note/note/note.component.ts (1314 bytes)
√  Migration succeeded.

>  Missing @Injectable migration.
   In Angular 9, enforcement of @Injectable decorators for DI is a bit stricter.
   Read more about this here: https://v9.angular.io/guide/migration-injectable
√  Migration succeeded.

>  ModuleWithProviders migration.
   In Angular 9, the ModuleWithProviders type without a generic has been deprecated.
   This migration adds the generic where it is missing.
   Read more about this here: https://v9.angular.io/guide/migration-module-with-providers
√  Migration succeeded.

>  NGCC postinstall migration.
   Adds an ngcc invocation to npm/yarn's postinstall script.
   Read more about this here: https://v9.angular.io/guide/migration-ngcc
UPDATE package.json (6918 bytes)
/ Installing packages...
> superProductivity@2.13.7 postinstall D:\sandbox\super-productivity
> ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points

Compiling @angular/cdk/keycodes : es2015 as esm2015
Compiling @angular/animations : es2015 as esm2015
Compiling @angular/cdk/testing : es2015 as esm2015
Compiling @angular/service-worker/config : es2015 as esm2015
Compiling @ngx-translate/http-loader : es2015 as esm2015
Compiling @angular/compiler/testing : es2015 as esm2015
Compiling @angular/core : es2015 as esm2015
Compiling ng-pick-datetime : module as esm5
Compiling @angular/animations/browser : es2015 as esm2015
Compiling @angular/common : es2015 as esm2015
Compiling @angular/cdk : es2015 as esm2015
Compiling @angular/cdk/coercion : es2015 as esm2015
Compiling @angular/cdk/portal : es2015 as esm2015
Compiling @angular/cdk/collections : es2015 as esm2015
Compiling @ngrx/store : es2015 as esm2015
Compiling @angular/cdk/platform : es2015 as esm2015
Compiling @ngx-formly/core/select : es2015 as esm2015
Compiling @angular/cdk/bidi : es2015 as esm2015
Compiling @angular/core/testing : es2015 as esm2015
Compiling @angular/platform-browser : es2015 as esm2015
Compiling @angular/cdk/observers : es2015 as esm2015
Compiling @angular/forms : es2015 as esm2015
Compiling @angular/common/http : es2015 as esm2015
Compiling @angular/cdk/text-field : es2015 as esm2015
Compiling @angular/cdk/scrolling : es2015 as esm2015
Compiling @angular/cdk/layout : es2015 as esm2015
Compiling @angular/platform-browser/animations : es2015 as esm2015
Compiling @angular/cdk/accordion : es2015 as esm2015
Compiling @angular/cdk/a11y : es2015 as esm2015
Compiling @ngx-formly/core : es2015 as esm2015
Compiling @angular/platform-browser/testing : es2015 as esm2015
Compiling @angular/platform-browser-dynamic : es2015 as esm2015
Compiling @angular/cdk/table : es2015 as esm2015
Compiling @ngrx/effects : es2015 as esm2015
Compiling @angular/cdk/overlay : es2015 as esm2015
Compiling @angular/material/core : es2015 as esm2015
Compiling @angular/cdk/stepper : es2015 as esm2015
Compiling @angular/cdk/tree : es2015 as esm2015
Compiling @angular/material/expansion : es2015 as esm2015
Compiling @angular/platform-browser-dynamic/testing : es2015 as esm2015
Compiling @angular/common/testing : es2015 as esm2015
Compiling @angular/platform-server : es2015 as esm2015
Compiling @angular/material/divider : es2015 as esm2015
Compiling @angular/material/button : es2015 as esm2015
Compiling @angular/material/form-field : es2015 as esm2015
Compiling @angular/material/radio : es2015 as esm2015
Compiling @angular/material/checkbox : es2015 as esm2015
Compiling @angular/material/dialog : es2015 as esm2015
Compiling @angular/material/icon : es2015 as esm2015
Compiling @angular/material/slide-toggle : es2015 as esm2015
Compiling @angular/material/tooltip : es2015 as esm2015
Compiling @angular/material/input : es2015 as esm2015
Compiling @ngx-formly/material/form-field : es2015 as esm2015
Compiling @angular/material/slider : es2015 as esm2015
Compiling @angular/material/select : es2015 as esm2015
Compiling @angular/material/badge : es2015 as esm2015
Compiling @angular/material/autocomplete : es2015 as esm2015
Compiling @angular/material/bottom-sheet : es2015 as esm2015
Compiling @angular/material/card : es2015 as esm2015
Compiling @angular/material/button-toggle : es2015 as esm2015
Compiling @angular/material/grid-list : es2015 as esm2015
Compiling @angular/material/chips : es2015 as esm2015
Compiling @angular/material/datepicker : es2015 as esm2015
Compiling @angular/material/list : es2015 as esm2015
Compiling @angular/material/menu : es2015 as esm2015
Compiling @angular/material/paginator : es2015 as esm2015
Compiling @angular/material/progress-bar : es2015 as esm2015
Compiling @angular/material/progress-spinner : es2015 as esm2015
Compiling @angular/material/sidenav : es2015 as esm2015
Compiling @angular/material/snack-bar : es2015 as esm2015
Compiling @angular/material/sort : es2015 as esm2015
Compiling @angular/material/toolbar : es2015 as esm2015
Compiling @angular/material/stepper : es2015 as esm2015
Compiling @ngrx/entity : es2015 as esm2015
Compiling @angular/material/tabs : es2015 as esm2015
Compiling @angular/material/table : es2015 as esm2015
Compiling @angular/material/tree : es2015 as esm2015
Compiling @angular/router : es2015 as esm2015
Compiling @angular/animations/browser/testing : es2015 as esm2015
Compiling @ngx-formly/material/input : es2015 as esm2015
Compiling @ngx-formly/material/textarea : es2015 as esm2015
Error: Error on worker #3: Error: Failed to compile entry-point @ngx-formly/material/textarea due to compilation errors:
node_modules/@ngx-formly/core/lib/core.module.d.ts(6,45): error TS-996005: FormlyModule.forChild returns a ModuleWithProviders type without a generic type argument. Please add a generic type argument to the ModuleWithProviders type. If this occurrence is in library code you don't control, please contact the library authors.

    at ClusterWorker.compile (D:\sandbox\super-productivity\node_modules\@angular\compiler-cli\ngcc\src\main.js:170:27)
    at Worker.<anonymous> (D:\sandbox\super-productivity\node_modules\@angular\compiler-cli\ngcc\src\execution\cluster\worker.js:41:42)
    at Worker.emit (events.js:198:13)
    at process.Worker.process.on (internal/cluster/worker.js:28:12)
    at process.emit (events.js:198:13)
    at emit (internal/child_process.js:832:12)
    at process._tickCallback (internal/process/next_tick.js:63:19)
    at ClusterMaster.onWorkerMessage (D:\sandbox\super-productivity\node_modules\@angular\compiler-cli\ngcc\src\execution\cluster\master.js:158:27)
    at D:\sandbox\super-productivity\node_modules\@angular\compiler-cli\ngcc\src\execution\cluster\master.js:46:95
    at ClusterMaster.<anonymous> (D:\sandbox\super-productivity\node_modules\@angular\compiler-cli\ngcc\src\execution\cluster\master.js:238:57)
    at step (D:\sandbox\super-productivity\node_modules\tslib\tslib.js:136:27)
    at Object.next (D:\sandbox\super-productivity\node_modules\tslib\tslib.js:117:57)
    at D:\sandbox\super-productivity\node_modules\tslib\tslib.js:110:75
    at new Promise (<anonymous>)
    at Object.__awaiter (D:\sandbox\super-productivity\node_modules\tslib\tslib.js:106:16)
    at EventEmitter.<anonymous> (D:\sandbox\super-productivity\node_modules\@angular\compiler-cli\ngcc\src\execution\cluster\master.js:232:32)
    at EventEmitter.emit (events.js:198:13)
Compiling @ngx-formly/material/radio : es2015 as esm2015
Compiling @ngx-formly/material/checkbox : es2015 as esm2015
Compiling @ngx-formly/material/multicheckbox : es2015 as esm2015
Compiling @angular/cdk/drag-drop : es2015 as esm2015
Compiling @ngx-formly/material/select : es2015 as esm2015
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! superProductivity@2.13.7 postinstall: `ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the superProductivity@2.13.7 postinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\kamik\AppData\Roaming\npm-cache\_logs\2019-11-01T16_51_17_783Z-debug.log
× Package install failed, see above.
The update failed. See above.
git HEAD was at 85f08a4d93e684566f751e38e2a2feffe0194cd9 before migrations.
×  Migration failed. See above for further details.
```

- the ngcc postinstall in `package.json` hook was left uncommited
- OBS: migration message about `git HEAD` doesn't sound very actionable for a lot of people
- OBS: the `git HEAD` message is also incorrect, the commit before migrations was another one:
```
* 558e5436 (HEAD -> update-9) update steps
* ec5e3201 migrate workspace for @angular/core@9.0.0-beta
* 85f08a4d migrate workspace for @angular/cli@9.0.0-beta.0
* 73e3ee1d Angular CLI update
* a06b9c06 update steps
```
- OBS: charles thinks we should remove the `git HEAD` message (AI: Filipe)
