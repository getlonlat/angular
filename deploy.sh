#!/bin/sh

echo "Deploy to gh-pages started...\n";

ng build --prod --base-href=/app2/;

git add dist;
git commit -m 'deploy gh-pages';

git subtree push --prefix dist origin gh-pages;

echo "\nDeploy finished.";