## Getting Started

Select the folder to work an open the terminal with right click.


```
git clone https://github.com/MarcoFedez1/PaybyGroup_automated_test.git
cd PaybyGroup_automated_test
npm install
npm init -y
npm i --save-dev @wdio/cli
```

To execute a especific test
```
./node_modules/.bin/wdio wdio.conf.js --spec ./specs/administration/DocumentUpdate.spec.ts

```
