#!/bin/sh

echo "Deploy to gh-pages started...\n";

# abort on errors
set -e;

# build
yarn ng build --prod --base-href=/angular/;

# navigate into the build output directory
cd dist;

git init;
git add -A;
git commit -m 'deploy to gh-pages';

# git subtree push --prefix dist origin gh-pages;

git push -f git@github.com:getlonlat/angular.git master:gh-pages;

cd -
