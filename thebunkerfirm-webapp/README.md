# The Bunker Firm - Internal Portal

En intern webapp til The Bunker Firm bygget med React, TypeScript, MUI og Supabase.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI Framework**: Material-UI (MUI) v6
- **Backend**: Supabase (Auth, Database, API)
- **Database**: PostgreSQL (via Supabase)
- **Styling**: MUI Theme + Emotion

## Funktioner

- 🔐 Bruger autentificering (Supabase Auth)
- 🏗️ Responsive layout med navigation
- 🚢 Havne administration (CRUD operationer)
- 📊 Dashboard med statistikker
- 🎨 The Bunker Firm branding og tema

## Kom i gang

### Forudsætninger

- Node.js 18+ og pnpm
- Supabase konto og projekt

### Installation

1. **Klon projektet**
   ```bash
   cd thebunkerfirm-webapp
   ```

2. **Installer dependencies**
   ```bash
   cd web
   pnpm install
   ```

3. **Opsæt environment variabler**
   ```bash
   cp .env.example .env
   ```
   
   Udfyld `.env` med dine Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Opsæt Supabase database**
   
   Kør migration for at oprette ports tabellen:
   ```sql
   -- I Supabase SQL Editor
   -- Kør indholdet af: supabase/migrations/20250526000001_create_ports_table.sql
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

   Appen kører nu på `http://localhost:3000`

### Supabase Opsætning

1. **Opret Supabase projekt** på [supabase.com](https://supabase.com)

2. **Konfigurer Authentication**
   - Gå til Authentication > Settings
   - Aktiver Email authentication
   - Sæt Site URL til `http://localhost:3000`

3. **Opret database tabeller**
   - Gå til SQL Editor
   - Kør migration scriptet fra `supabase/migrations/20250526000001_create_ports_table.sql`

4. **Opret test bruger**
   - Gå til Authentication > Users
   - Klik "Add user" og opret en test bruger

## Projektstruktur

```
thebunkerfirm-webapp/
├── web/                          # Frontend React app
│   ├── src/
│   │   ├── components/           # Genbrugelige komponenter
│   │   ├── contexts/            # React contexts (Auth)
│   │   ├── lib/                 # Utilities (Supabase client)
│   │   ├── pages/               # Side komponenter
│   │   ├── theme/               # MUI tema konfiguration
│   │   └── types/               # TypeScript type definitioner
│   ├── package.json
│   └── vite.config.ts
├── supabase/                     # Supabase konfiguration
│   ├── config.toml              # Lokal Supabase config
│   └── migrations/              # Database migrationer
└── README.md
```

## Udvikling

### Tilføj nye sider

1. Opret ny komponent i `src/pages/`
2. Tilføj route i `src/App.tsx`
3. Tilføj navigation item i `src/components/Layout.tsx`

### Database ændringer

1. Opret ny migration fil i `supabase/migrations/`
2. Kør migration i Supabase SQL Editor
3. Opdater TypeScript types i `src/types/`

### Styling

- Rediger tema farver i `src/theme/palette.ts`
- Rediger typografi i `src/theme/typography.ts`
- Tilføj komponente styles i `src/theme/index.ts`

## Deployment

### Frontend (Supabase Storage)

```bash
# Build frontend
cd web
pnpm build

# Upload til Supabase Storage bucket 'public/webapp'
supabase storage cp -r dist/* public/webapp/
```

### Database Migrationer

```bash
# Kør migrationer på production
supabase db push
```

## Scripts

```bash
# Development
pnpm dev          # Start dev server

# Build
pnpm build        # Build for production
pnpm preview      # Preview production build

# Linting & Testing
pnpm lint         # Run ESLint
pnpm test         # Run tests
```

## Miljøer

- **Development**: `http://localhost:3000`
- **Production**: Supabase Storage hosted webapp

## Support

For spørgsmål eller problemer, kontakt udviklingsteamet.
