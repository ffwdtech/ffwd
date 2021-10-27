# ffwd

Workflow:

- Use pnpm
- If you're lazy, build with `build-all.sh` (might need two runs)
- Bump versions before publishing as they're tied to the pnpm workspace
- Publish order:
  1. util
  2. config
  3. db
  4. db-util
  5. pga
  6. pga-test-bootstrap

