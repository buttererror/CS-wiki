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

Downloads and runs a test container to confirm Docker is functioning correctly.

```
```
