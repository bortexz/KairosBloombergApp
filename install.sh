rm app.nw
cd app
zip -r ../app.nw *
cd ..
./node-webkit/node-webkit.app/Contents/MacOS/node-webkit app.nw