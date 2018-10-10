#!/bin/bash
NAME="$1"
DIR="$2"

cd $DIR
cat > composer.json << EOF
{
    "name": "${NAME}",
    "type": "project",
    "authors": [
        {
            "name": "Calvin Koepke",
            "email": "hello@calvinkoepke.com"
        }
    ],
	"repositories": {
		"core": {
			"type": "path",
			"url": "~/Repos/genesisprotools",
			"options": {
				"symlink": true
			}
		}
	},
    "require": {
		"gpt/core": "dev-master"
	}
}
EOF