# Technical assessment requirements

## Required flows

- Trainer: required photo, name and birth date; optional hobby.
- Age 18 or older: required DUI, format `00000000-0`, automatic hyphen.
- Under 18: optional minor identification card.
- Pokémon: first 151 from PokeAPI; search by ID or name; exactly three selected.
- Sprite: `sprites.other.home.front_default`.
- Profile: photo, name, hobby, calculated age and nonempty identification.
- Team: sprites, names, types and progress bars for all six stats.
- Stat limits: HP 255, attack 190, defense 230, special attack 194,
  special defense 230 and speed 180.
- Allow profile and team editing. Persist data in localStorage.
- Handle validation, loading and network errors. Loading GIF must be supplied separately.
- Responsive layout, reusable components and typed hooks and services.
- English comments and commit messages; Gitflow.
- README and repository link for delivery.

## Optional additions

Virtual scrolling, Swiper, production Dockerfile and Vitest.

## Implementation order

1. Architecture, JSON configuration, routing and state foundation.
2. Trainer form, age calculations, validation and persistence.
3. Pokémon loading, filtering and selection.
4. Trainer profile, team statistics and editing.
5. Validation of complete flows, responsive design and delivery.
