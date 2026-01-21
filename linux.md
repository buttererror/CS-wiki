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
