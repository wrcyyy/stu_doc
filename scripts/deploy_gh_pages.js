'use strict';

var gh_pages = require('gh-pages');

main();

function main() {
    gh_pages.publish('../gh-pages', console.error.bind(console));
}