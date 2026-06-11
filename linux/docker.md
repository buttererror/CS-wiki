# Docker Installation Commands Summary

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

Creates the directory used to store trusted APT signing keys.

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg
```

Downloads Docker's official GPG key used to verify package authenticity.

```bash
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

Allows APT to read Docker's signing key.

```bash
sudo tee /etc/apt/sources.list.d/docker.sources
```

Creates an APT repository definition so the system knows where to download Docker packages.

```bash
sudo apt update
```

Refreshes the local package index from all configured repositories.

```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Installs:

* `docker-ce` → Docker Engine
* `docker-ce-cli` → Docker command line tool
* `containerd.io` → Container runtime used by Docker
* `docker-buildx-plugin` → Advanced image building features
* `docker-compose-plugin` → `docker compose` command support

```bash
sudo usermod -aG docker $USER
```

Adds the current user to the Docker group, allowing Docker commands without `sudo`.

```bash
newgrp docker
```

Applies the new group membership without logging out.

```bash
docker --version
```

Verifies Docker Engine installation.

```bash
docker compose version
```

Verifies Docker Compose installation.

```bash
docker run hello-world
```
---
---
# Docker commands
1. Start PostgreSQL container
```
docker compose -f infra/docker/docker-compose.yml up -d
```
```
docker compose     use Docker Compose
-f                 specify compose file
up                 create/start containers
-d                 detached mode (background)
```
2. Verify container
```
docker ps
```
---
---
# Docker Compose File Explanation

```yaml
services:
```

Defines the containers managed by Docker Compose. A project can have multiple services such as PostgreSQL, API, Redis, etc.

---

```yaml
postgres:
```

Creates a service named `postgres`.

---

```yaml
image: postgres:17
```

Uses the official PostgreSQL version 17 image from Docker Hub.

---

```yaml
container_name: <container-name>
```

Assigns a predictable name to the container instead of Docker generating a random one.

Benefits:

* Easier log inspection
* Easier shell access
* Easier container management

Example usage:

```bash
docker logs <container-name>
docker exec -it <container-name> bash
```

---

```yaml
environment:
```

Provides environment variables to PostgreSQL during initialization.

Typical usage:

* Database name
* Database user
* Database password

On first startup PostgreSQL uses these values to create the initial database and user.

---

```yaml
ports:
  - "<host-port>:<container-port>"
```

Maps a port on the host machine to a port inside the container.

Format:

```txt
HOST_PORT:CONTAINER_PORT
```

Example:

```txt
Laptop Port 5432
        ↓
Container Port 5432
```

Allows local applications to connect to PostgreSQL running inside Docker.

---

```yaml
volumes:
  - <volume-name>:/var/lib/postgresql/data
```

Persists PostgreSQL data outside the container.

Without a volume:

```txt
Delete container
↓
Database data is lost
```

With a volume:

```txt
Delete container
↓
Database data remains
```

The path `/var/lib/postgresql/data` is PostgreSQL's internal data directory where tables, indexes, and database files are stored.

---

```yaml
restart: unless-stopped
```

Automatically restarts the container if:

* Docker restarts
* The machine reboots

Unless the container was intentionally stopped by the user.

---

```yaml
volumes:
  <volume-name>:
```

Declares a named Docker volume.

A named volume is managed by Docker and stores persistent data independently of container lifecycle.

Benefits:

* Data survives container recreation
* Easy backup and migration
* Cleaner than storing database files directly in the project directory

---

## Architecture Overview

```txt
Application
      │
      ▼
Host Machine Port
      │
      ▼
Docker Container
(PostgreSQL)
      │
      ▼
Persistent Docker Volume
(Database Files)
```

This setup provides:

* Isolated PostgreSQL installation
* Reproducible local development environment
* Persistent database storage
* Easy startup and shutdown through Docker Compose
