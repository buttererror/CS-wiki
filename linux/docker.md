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
# Docker Runtime Commands

```bash
docker compose -f infra/docker/docker-compose.yml up -d
```

Starts all services defined in the specified Compose file.

Parameters:

* `compose` → Use Docker Compose
* `-f` → Specify the Compose file location
* `up` → Create and start services
* `-d` → Run in detached mode (background)

---

```bash
docker ps
```
```bash
docker ps -a
```
`- a`: show all containers (running and stopped)

Lists currently running containers.

Useful for:

* Verifying containers are running
* Checking container names
* Viewing exposed ports

---

```bash
docker logs <container-name>
```

Displays logs produced by a container.

Useful for:

* Troubleshooting startup issues
* Confirming application readiness
* Inspecting runtime errors

---

```bash
docker exec -it <container-name> <command>
```

Executes a command inside a running container.

Parameters:

* `exec` → Execute command
* `-i` → Interactive input
* `-t` → Allocate terminal

Example:

```bash
docker exec -it <container-name> psql -U <user> -d <database>
```

Opens the PostgreSQL CLI inside the container.

---

```bash
docker compose -f infra/docker/docker-compose.yml exec <service> <command>
```

Executes a command inside a service managed by Docker Compose.

Example:

```bash
docker compose -f infra/docker/docker-compose.yml exec postgres psql -U <user> -d <database>
```

Useful because it uses the Compose service name instead of the container name.

---

```bash
docker compose -f infra/docker/docker-compose.yml down
```

Stops and removes containers created by the Compose file.

Data remains intact when persistent volumes are configured.

```
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

---
# Docker Compose Reset Commands

```bash
docker compose -f infra/docker/docker-compose.yml down -v
```

Stops and removes containers, networks, and associated named volumes created by the Compose file.

Parameters:

* `down` → Stop and remove resources
* `-v` → Remove named volumes

Use when:

* PostgreSQL initialization settings have changed
* You want a completely fresh database
* You need to recreate users, passwords, or databases defined by environment variables

Warning:

* Deletes data stored in Docker volumes

---

```bash
docker compose -f infra/docker/docker-compose.yml up -d
```

Creates and starts services again.

After a volume reset (`down -v`), PostgreSQL performs a fresh initialization using the environment variables defined in the Compose file.

Typical use:

```bash
docker compose -f infra/docker/docker-compose.yml down -v
docker compose -f infra/docker/docker-compose.yml up -d
```

This recreates the PostgreSQL instance from scratch.

---

```bash
docker volume ls
```

Lists all Docker volumes on the machine.

Useful for:

* Verifying volume creation
* Inspecting persistent storage used by containers

---

```bash
docker compose -f infra/docker/docker-compose.yml exec postgres psql
```

Opens the PostgreSQL CLI inside the running PostgreSQL service.

Useful for:

* Verifying users and databases
* Running SQL commands
* Troubleshooting authentication issues

Example:

```sql
\du
```

Lists PostgreSQL roles (users).

```sql
\l
```
