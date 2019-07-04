## Getting Started

Select the folder to work an open the terminal with right click.


```
git clone https://github.com/MarcoFedez1/PaybyGroup_automated_test.git
cd PaybyGroup_automated_test
npm install
npm init -y
npm i --save-dev @wdio/cli
./node_modules/.bin/wdio wdio.conf.js
npm install -D ts-node
npm install -D typescript
npm install --save-dev tsconfig-paths
```

To execute a especific test
```
./node_modules/.bin/wdio wdio.conf.js --spec ./specs/createGroup.spec.ts
```
