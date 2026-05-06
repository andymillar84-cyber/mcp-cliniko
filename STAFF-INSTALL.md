# Cliniko MCP — Staff Install Guide

Install the Cliniko MCP server so Claude Desktop can read and update Cliniko data on your behalf.

## Before you start

You need:
- Your Cliniko API key. In Cliniko: **Settings → My Info → Manage API Keys → Generate API Key**. Copy the whole key (it ends with something like `-au1`, `-au5`, `-uk1`, or similar — that's normal).
- About 10 minutes.

## Step 1 — Install Node.js

Download from https://nodejs.org and run the installer. Accept all defaults.

- **Mac:** click **macOS Installer (.pkg)** → double-click the downloaded file.
- **Windows:** click **Windows Installer (.msi)** → double-click the downloaded file.

After it finishes, close any open Claude Desktop / Terminal / PowerShell windows.

## Step 2 — Ask Claude Code to install the MCP

Open Claude Desktop. Open a new Claude Code session inside it. Paste this entire message:

---

> Please install the Cliniko MCP server for Claude Desktop on this computer.
>
> 1. Download the main-branch ZIP from `https://github.com/andymillar84-cyber/mcp-cliniko/archive/refs/heads/main.zip` and extract it to my home directory as a folder called `mcp-cliniko`. Do not use git — just download the ZIP and unzip it.
> 2. Inside that folder, run `npm install` and then `npm run build`. Wait for both to finish.
> 3. Update my Claude Desktop config file to add the MCP server.
>    - Mac config path: `~/Library/Application Support/Claude/claude_desktop_config.json`
>    - Windows config path: `%APPDATA%\Claude\claude_desktop_config.json`
> 4. Add a `cliniko` entry under `mcpServers` (create the `mcpServers` block if it doesn't exist — preserve everything else in the file). The `command` should be `node` (use its absolute path on Mac) and the `args` should be the absolute path to the built `dist/index.js` inside the unzipped folder. For the `CLINIKO_API_KEY` env var, use the literal placeholder string `REPLACE_WITH_YOUR_API_KEY` — I will paste the real key in myself afterwards.
> 5. When you're done, print the exact path of the config file you edited so I can open it, and remind me to fully quit and reopen Claude Desktop.

---

Wait for Claude Code to finish all the steps.

## Step 3 — Paste your API key into the config

Open the config file Claude Code just edited.

- **Mac:** in Terminal, run `open -e "$HOME/Library/Application Support/Claude/claude_desktop_config.json"` (opens in TextEdit).
- **Windows:** press **Win+R**, paste `%APPDATA%\Claude\claude_desktop_config.json`, press Enter, choose Notepad if asked.

Use **Find** (Cmd+F or Ctrl+F) to locate `REPLACE_WITH_YOUR_API_KEY`. Replace it with your Cliniko API key. **Keep the surrounding double-quotes.** Save the file (Cmd+S / Ctrl+S) and close it.

## Step 4 — Restart Claude Desktop

Fully quit, don't just close the window:

- **Mac:** with Claude Desktop in focus, press **Cmd+Q**.
- **Windows:** right-click the Claude Desktop icon in the system tray → **Quit**.

Then reopen Claude Desktop and start a **brand-new chat**. Existing chats won't see the new MCP.

## Step 5 — Test it

In the new chat, type:

> List my Cliniko businesses

If your clinic appears, you're done.

If you see an error, copy the error message and paste it back to Claude Code — it can help diagnose. The most common cause is a typo in the API key (a missing character or extra space).
