# Redesign — Cabinet Dentaire

## Fichiers
- `app/layout.tsx` — fonts Poppins/Roboto, metadata SEO, JSON-LD Dentist
- `app/page.tsx` — page complète (client component : menu mobile, lightbox, formulaire)
- `app/globals.css` — tous les styles (tokens, sections, responsive, reduced-motion)

## Installation
1. Copier les 3 fichiers dans votre projet Next.js existant (remplacer les anciens).
2. Remplacer les placeholders `[...]` : nom du cabinet, ville, adresse, téléphone, email, biographie, avis, URL Google Maps, liens légaux.
3. Remplacer les URLs Unsplash par les vraies photos du cabinet (hero, philosophie, portrait, galerie).
4. Si le site est statique, la découpe en composants peut se faire section par section sans changer le CSS.

## À personnaliser
- `GALLERY`, `REVIEWS`, `SERVICES`, `WHY` : tableaux en haut de `page.tsx`
- Formulaire : brancher `onSubmit` sur votre API/route existante (`/api/rendez-vous`)
