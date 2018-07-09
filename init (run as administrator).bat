@setlocal enableextensions
@cd /d "%~dp0"
npm i -g @angular/cli

nuget restore  -PackagesDirectory ../packages
cd AngularProject
npm i 
ng b -op ../AngularBuild