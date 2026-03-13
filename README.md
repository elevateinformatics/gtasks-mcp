# Google Tasks MCP Server

MCP server for integrating Google Tasks with Claude Desktop.

## Quick Start (for colleagues)

### 1. One-time setup — GitHub Packages auth

Crear un [GitHub Personal Access Token](https://github.com/settings/tokens/new) con scope `read:packages`, luego:

```bash
echo "@elevateinformatics:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=TU_GITHUB_TOKEN" >> ~/.npmrc
```

### 2. Colocar credenciales de Google Cloud

Crear la carpeta `~/.gtasks/` y colocar ahí el archivo `gcp-oauth.keys.json`:

```bash
mkdir -p ~/.gtasks
cp gcp-oauth.keys.json ~/.gtasks/
```

Para obtener `gcp-oauth.keys.json`:

1. [Create a Google Cloud project](https://console.cloud.google.com/projectcreate)
2. [Enable the Google Tasks API](https://console.cloud.google.com/workspace-api/products)
3. [Configure OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent) (internal)
4. Add scope: `https://www.googleapis.com/auth/tasks`
5. [Create an OAuth Client ID](https://console.cloud.google.com/apis/credentials/oauthclient) → Desktop App
6. Download and rename the file to `gcp-oauth.keys.json`

### 3. Configure Claude Desktop

Agregar a `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gtasks": {
      "command": "npx",
      "args": ["-y", "@elevateinformatics/gtasks-mcp"]
    }
  }
}
```

- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

Al iniciar Claude Desktop, si no hay credenciales guardadas, se abre automáticamente el flujo de autenticación OAuth en el browser. Los tokens se guardan en `~/.gtasks/credentials.json` y se renuevan automáticamente.

> **Path custom:** Si querés guardar los archivos en otra ubicación, agregar `"env": { "GTASKS_DIR": "/ruta/custom" }` en la config.

---

## Alternative: Docker

```bash
docker pull ghcr.io/elevateinformatics/gtasks-mcp:latest
```

---

## Tools available

| Tool | Description |
| ---- | ----------- |
| `list` | List all tasks |
| `list-tasklists` | List all task lists with their IDs |
| `search` | Search tasks by query |
| `create` | Create a task |
| `update` | Update title, notes, status, or due date |
| `delete` | Delete a task |
| `clear` | Clear completed tasks from a list |

---

## Development

```bash
git clone https://github.com/elevateinformatics/gtasks-mcp
cd gtasks-mcp
npm install
npm run build
node dist/index.js auth   # first-time auth
npm start
```

### Publishing a new release

```bash
git tag v1.0.1
git push origin v1.0.1
```

GitHub Actions will automatically publish to npm and push the Docker image to GHCR.
