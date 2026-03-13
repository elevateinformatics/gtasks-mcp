# Google Tasks MCP Server

MCP server for integrating Google Tasks with Claude Desktop.

## Quick Start (for colleagues)

### 0. One-time setup — GitHub Packages auth

Crear un [GitHub Personal Access Token](https://github.com/settings/tokens/new) con scope `read:packages`, luego:

```bash
# ~/.npmrc  (crear si no existe)
echo "@elevateinformatics:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=TU_GITHUB_TOKEN" >> ~/.npmrc
```

### 1. Prerequisites — Google Cloud credentials

You need a `gcp-oauth.keys.json` file. Ask a team member or create one:

1. [Create a Google Cloud project](https://console.cloud.google.com/projectcreate)
2. [Enable the Google Tasks API](https://console.cloud.google.com/workspace-api/products)
3. [Configure OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent) (internal)
4. Add scope: `https://www.googleapis.com/auth/tasks`
5. [Create an OAuth Client ID](https://console.cloud.google.com/apis/credentials/oauthclient) → Desktop App
6. Download and rename the file to `gcp-oauth.keys.json`

### 2. Authenticate

Place `gcp-oauth.keys.json` in a permanent folder (e.g. `~/.gtasks/`) then run:

```bash
npx @elevateinformatics/gtasks-mcp auth
```

This opens a browser, completes the OAuth flow, and saves `.gtasks-server-credentials.json` next to the package.

> **Tip:** credentials are saved relative to the package. For a stable path, clone the repo instead of using npx.

### 3. Configure Claude Desktop

Add to `claude_desktop_config.json`:

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

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

Restart Claude Desktop. Done.

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
