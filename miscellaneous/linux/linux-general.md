# 🐧 Linux Commands — Categorized Reference Notes

> Purpose: A practical, searchable reference.  
> Each command includes: **what it does**, **how to use it**, and **which Linux category it belongs to**.

---

## File & Directory Management

### `mv` — Move / Rename Files (Destructive)

**Category:** File system operations

**What it does:**  
Moves or renames files and directories. Changes are permanent (no Trash, no undo).

```bash
mv source target
mv file.txt /some/path/
mv oldname.txt newname.txt
```

**Common options:**
```bash
mv -i file.txt target/   # ask before overwrite
mv -n file.txt target/   # never overwrite
mv -v file.txt target/   # verbose
```

**When to use:**  
Renaming files, reorganizing directories.

**Gotcha:**  
Overwriting is final.

---

### `mkdir -p` — Create Directories Safely

**Category:** File system operations

**What it does:**  
Creates directories and any missing parent directories.

```bash
mkdir -p path/to/new/folder
```

**When to use:**  
Scripts, Dockerfiles, CI/CD, project setup.

**Why `-p` matters:**  
No error if directories already exist.

---

## Package Management & Security

### `curl -fsSL` — Download Data Securely

**Category:** Networking / package management

**What it does:**  
Downloads data from a URL.

```bash
curl -fsSL https://example.com/file
```

**Flags:**
- `-f` fail on HTTP errors  
- `-s` silent  
- `-S` show errors  
- `-L` follow redirects  

**When to use:**  
Fetching install scripts, GPG keys, APIs.

---

### `gpg --dearmor` — Convert GPG Key Format

**Category:** Security / package verification

**What it does:**  
Converts ASCII-armored GPG keys to binary format.

```bash
gpg --dearmor key.asc
```

**When to use:**  
Modern `apt` keyring setup.

---

### `tee` — Write Output with Elevated Permissions

**Category:** Shell utilities / permissions

**What it does:**  
Writes stdin to a file (useful with `sudo`).

```bash
command | sudo tee /path/to/file
```

**When to use:**  
Writing system files where `>` would fail.

---

## Archives & Compression

### `tar xf` — Extract Archives

**Category:** File compression / archives

**What it does:**  
Extracts archive contents into the current directory.

```bash
tar xf archive.tar.xz
```

**Useful variants:**
```bash
tar tf archive.tar.xz         # list contents
tar xvf archive.tar.xz        # verbose
tar xf archive.tar.xz -C dir  # extract to directory
```

---

## Shell & Environment

### `echo $SHELL` — Show Default Login Shell

**Category:** Shell environment

**What it does:**  
Prints the default login shell.

```bash
echo $SHELL
```

**Note:**  
Not always the currently running shell.

---

### `source ~/.bashrc` — Reload Shell Configuration

**Category:** Shell environment

**What it does:**  
Applies changes in `.bashrc` to the current shell.

```bash
source ~/.bashrc
```

**When to use:**  
After editing PATH, aliases, exports.

---

### `which` — Locate Executable in PATH

**Category:** Shell / command resolution

**What it does:**  
Shows which binary will be executed.

```bash
which flutter
```

**When to use:**  
Debug PATH issues, multiple installations.

---

## Process Management

### `pkill -f` — Kill Processes by Pattern

**Category:** Process management

**What it does:**  
Terminates processes matching a command-line pattern.

```bash
pkill -f "flutter|dart" || true
```

**Why `|| true`:**  
Prevents script failure if no process matches.

---

## Logs & Inspection

### `ls -lah` — Inspect File Metadata

**Category:** File inspection

**What it does:**  
Shows permissions, owner, size, and timestamps.

```bash
ls -lah /path/to/file
```

---

### `tail -n` — View Recent Log Entries

**Category:** Log inspection

**What it does:**  
Displays the last N lines of a file.

```bash
tail -n 80 file.log
```

**When to use:**  
Debugging crashes, reading latest errors.

---

## Advanced Debugging

### `timeout` — Limit Command Runtime

**Category:** Process control

**What it does:**  
Stops commands that run too long.

```bash
timeout 20s command
```

---

### `strace` — Trace System Calls

**Category:** Low-level debugging

**What it does:**  
Logs system calls made by a process.

```bash
strace -f -tt -T -o log command
```

**When to use:**  
Diagnosing hangs, permission errors, OS-level issues.

---

### `$?` — Exit Code Inspection

**Category:** Shell fundamentals

**What it does:**  
Shows exit code of the last command.

```bash
echo $?
```

**Common values:**
- `0` success  
- `124` timeout  
- `137` SIGKILL  

---

## Core Mental Models

- Linux commands act **directly on the system**
- PATH decides which command runs
- Logs show *what* happened, tracing shows *why*
- Prefer safe flags (`-p`, `-i`) unless you need strict behavior
---
### `tree` command is a command-line utility used to recursively list and display the contents of a directory in a graphical, hierarchical tree-like format. It helps developers and administrators visually map out the relationships between files and deeply nested folders

---
# Group Configuration

```bash
sudo usermod -aG docker $USER
```

Adds the current user to the Docker group.

Purpose:

* Allows Docker commands without `sudo`
* Improves developer experience

Parameters:

* `usermod` → Modify user account
* `-a` → Append
* `-G` → Add to supplementary group
* `docker` → Target group

---

```bash
newgrp docker
```

Applies the new group membership immediately without logging out and back in.

After successful execution:

```bash
docker ps
```

can be used instead of:

```bash
sudo docker ps
```
### `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash`

Downloads and immediately executes the official **NVM (Node Version Manager)** installation script.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
```

Breakdown:

- `curl` → download data from a URL.
- `-o-` → write the downloaded content to **stdout** (`-` means "terminal output" instead of a file).
- `https://.../install.sh` → the installation script hosted on GitHub.
- `|` → pipe the downloaded script directly into another command.
- `bash` → execute the script using the Bash shell.

Typical use:

- Install NVM without manually downloading the script.
- Common first step before installing multiple Node.js versions.

What the installer usually does:

- Clones the NVM repository into:
  ```text
  ~/.nvm
  ```
- Adds initialization lines to your shell configuration (`~/.bashrc`, `~/.zshrc`, etc.).
- Instructs you to reload your shell:
  ```bash
  source ~/.bashrc
  ```

After installation:

```bash
nvm --version
nvm install --lts
nvm install 22
nvm use 22
```

⚠️ **Security Note**

This pattern downloads a remote script and executes it immediately.

While common for official installers (NVM, Rust, Bun, etc.), it's good practice to inspect the script first:

```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh
```

or save it locally:

```bash
curl -O https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh
less install.sh
bash install.sh
```

This lets you review what the script will do before executing it.
---
### `source ~/.bashrc`

Reloads the Bash configuration file and applies any changes to the **current terminal session**.

```bash
source ~/.bashrc
```

Breakdown:

- `source` → execute the contents of a file in the **current shell**.
- `~` → your home directory.
- `.bashrc` → Bash configuration file containing aliases, environment variables, PATH updates, functions, etc.

Typical use:

- Apply changes after editing `.bashrc`.
- Reload newly added environment variables.
- Refresh aliases and shell functions.
- Avoid closing and reopening the terminal.

Example:

```bash
echo 'export PATH="$PATH:$HOME/flutter/bin"' >> ~/.bashrc
source ~/.bashrc
flutter --version
```

Equivalent command:

```bash
. ~/.bashrc
```

(`.` is shorthand for `source`.)

**Mental model:**

Without `source`:

```text
Edit .bashrc
        ↓
Changes are saved
        ↓
Current terminal is unchanged
```

With `source`:

```text
Edit .bashrc
        ↓
source ~/.bashrc
        ↓
Current terminal immediately uses the new configuration
```

**Common use cases:**

- After installing NVM
- After adding Flutter to `PATH`
- After creating aliases
- After modifying environment variables (`export`)
- After changing shell functions
---
### NVM vs NPM vs Corepack vs PNPM

These tools work together but serve different purposes.

```
NVM
 └── installs Node.js
        │
        ├── Node.js includes → npm
        │
        └── Node.js also includes → Corepack (modern Node versions)
                                         │
                                         ├── manages pnpm
                                         └── manages Yarn
```

---

### `nvm` (Node Version Manager)

**Purpose:** Manage multiple Node.js versions.

Example:

```bash
nvm install 22
nvm use 22
nvm ls
```

Use it when:
- Switching Node versions between projects.
- Installing the latest LTS version.

---

### `npm` (Node Package Manager)

**Purpose:** Install JavaScript packages.

Installed **automatically with Node.js**.

Example:

```bash
npm install express
npm install -g typescript
```

Use it when:
- Installing project dependencies.
- Publishing packages.
- Running npm scripts.

---

### `corepack`

**Purpose:** Manage package managers (pnpm and Yarn).

Installed **with modern Node.js versions**.

Example:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Use it when:
- You want the version of pnpm/Yarn defined by a project.
- Avoid installing package managers globally.

---

### `pnpm`

**Purpose:** Alternative package manager to npm.

Features:
- Faster installs.
- Saves disk space.
- Better dependency management.
- Common in modern monorepos (TurboRepo, Nx, etc.).

Example:

```bash
pnpm install
pnpm add prisma
pnpm dev
```

---

## Which tool installs `pnpm`?

### Modern approach (Recommended)

`Corepack` installs and manages `pnpm`.

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

or simply:

```bash
corepack enable
```

The first time you run:

```bash
pnpm install
```

Corepack automatically downloads the required pnpm version.

---

### Legacy approach

Install pnpm globally using npm:

```bash
npm install -g pnpm
```

Works, but is no longer the recommended approach because you must manually update pnpm and it isn't project-version aware.

---

## Recommended Installation Flow

```bash
# Install Node
nvm install --lts

# Use that version
nvm use --lts

# Enable Corepack
corepack enable

# Verify
pnpm --version
```

**Mental model**

- **NVM** → installs **Node.js**
- **Node.js** → includes **npm** and **Corepack**
- **Corepack** → installs/manages **pnpm** (and Yarn)
- **pnpm** → installs your project's dependencies

---
### `grep` — Filter Text by Pattern

**Category:** Search / Text Processing

**What it does:**  
Searches for lines matching a text pattern. `grep` is commonly used to filter the output of another command through a pipe (`|`).

Example:

```bash
sudo docker exec docker-postgres-1 env | grep POSTGRES
```

Breakdown:

- `sudo docker exec docker-postgres-1 env`
  - Executes the `env` command inside the running Docker container.
  - `env` prints all environment variables.

- `|`
  - Pipes the output of `env` into another command.

- `grep POSTGRES`
  - Filters the output and displays only lines containing `POSTGRES`.

Example output:

```text
POSTGRES_DB=xxx
POSTGRES_USER=xxx
POSTGRES_PASSWORD=xxxx
```

Common uses:

```bash
ps aux | grep node            # Find Node.js processes
env | grep PATH               # Show PATH variable
history | grep docker         # Search command history
cat app.log | grep ERROR      # Find error messages in a log
grep -r "TODO" src/           # Search recursively in files
```

Useful options:

```bash
grep -i "error" file.log      # Ignore case
grep -n "TODO" app.js         # Show line numbers
grep -v "DEBUG" app.log       # Exclude matching lines
grep -r "config" .            # Search recursively
```

**Mental model:**

Think of `grep` as a **filter**.

```
Command Output
      │
      ▼
    grep
      │
      ▼
Only the matching lines remain
```

**Rule of thumb:**

- **`grep` searches text.**
- **`find` searches files.**
- They are often combined to quickly locate information in Linux.
