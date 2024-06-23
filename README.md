# NextJS Lucia Auth Email Sqlite

The following is an example implementing Lucia email authentication with Sqlite.

## Requirements

- Node `v20` or greater
- Pnpm

## Quick Setup

### 1 - Install Dependencies

```bash
# FROM: ./

pnpm install;
```

### 2 - Set Environment Variables

```bash
# FROM: ./

cp .env.example .env;
```

### 3 - Generate Local Database

```bash
# FROM: ./

pnpm db:gen;
```

### 4 - Push Database Changes

```bash
# FROM: ./

pnpm db:push;
```

### 5 - Run App

```bash
# FROM: ./

pnpm dev;

# [Expected Output]:
#   ▲ Next.js 14.2.3
#   - Local:        http://localhost:3000
#   - Environments: .env.local
# 
#  ✓ Starting...
#  ✓ Ready in 1785ms
```

### 5 - Run Drizzle Studio

```bash
# FROM: ./

pnpm db:studio;

# [Expected Output]:
# ...
# Drizzle Studio is up and running on https://local.drizzle.studio
```