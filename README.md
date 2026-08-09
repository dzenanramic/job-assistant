# Job Assistant

Spojeni projekat: Chrome ekstenzija (`extension/`) + NestJS backend (`backend/`).

## Struktura

```
job-assistant/
├── backend/                    # NestJS API (DeepSeek AI analiza)
│   ├── src/                    # izvorni kod (nepromijenjen)
│   └── .env.example            # kopiraj u .env i unesi svoj ključ
├── extension/                  # Chrome extension (nepromijenjena)
└── README.md
```

## Pokretanje

```bash
# backend (port 3000)
cd backend
cp .env.example .env        # unesi svoj DEEPSEEK_API_KEY ako .env ne postoji
npm install
npm run start:dev

# ekstenzija
cd ../extension
npm install
# učitaj `extension/` folder kao unpacked ekstenziju:
# chrome://extensions → Developer mode → Load unpacked
```

Backend API: `http://localhost:3000/jobs`

Ekstenzija šalje oglas i CV na `http://localhost:3000/jobs` (backend).
