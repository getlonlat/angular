#!/bin/sh

echo "Deploy to gh-pages started...\n";

# abort on errors
set -e;

# build
yarn ng build --prod --base-href=/;

# navigate into the build output directory
cd dist;

# deploy to a custom domain
echo 'angular.getlonlat.top' > CNAME;

git init;
git add -A;
git commit -m 'deploy to gh-pages';

# git subtree push --prefix dist origin gh-pages;

git push -f git@github.com:getlonlat/angular.git master:gh-pages;

cd -
