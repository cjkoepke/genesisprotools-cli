# Genesis Pro Tools CLI
The official Command Line Interface for Genesis Pro Tools. Easily manage your Genesis Pro Tools packages
without having to mess with Composer or NPM.

This CLI assumes that you have an account (or credentials) on Genesis Pro Tools, both free and paid.

## Commands
### `gpt config`
Sets up your local machine with global credentials to access Genesis Pro Tools packages. If using GPT-CLI for the first time,
you'll likely want to run this command first so that all the following commands don't ask for authentication.

### `gpt install [packages...]`
Install Genesis Pro Tools packages in the current working directory. This typically handles creating a project `composer.json` file (if it doesn't exist already)
and adding required dependencies.

Example of how to install the free Core Theme package:

```bash
gpt install core-theme
```

### `gpt theme <cmd>`
Performs theme-level commands, like search/replace, copying of starter files, and more.

#### `start`
Copies over theme files from the Genesis Pro Tools starter theme, Uno. Since this includes required files for a theme,
it is recommended to only run it during a first-time install (thus using the command name `start` to emphasize it's purpose).

Example for installing the Core Theme package and copying Uno theme files immediately after:

```bash
gpt install core-theme && gpt theme start
```