#!/bin/bash
SLUG="$1"
VER="$2"
DIR="$3"

cd $DIR
cat > composer.json << EOF
{
    "name": "vendor/name",
    "type": "project",
	"repositories": [
        {"type": "composer", "url": "https://genesis-pro-tools.repo.packagist.com/${SLUG}/"}
    ],
    "require": {
		"gpt/core": "${VER}"
	}
}
EOF