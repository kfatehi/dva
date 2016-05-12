set -x
rm -rf es5
mkdir -p es5/bin
babel bin/www --out-file es5/bin/www 

cp -r src es5
babel es5/src --out-dir es5/src

cp -r config es5
cp -r public es5
cp -r var es5
