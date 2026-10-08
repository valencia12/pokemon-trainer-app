#!/bin/sh
set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$project_dir"
architecture=${1:-amd64}
case "$architecture" in
  amd64|arm64) ;;
  *) echo 'Usage: sh scripts/export-docker.sh [amd64|arm64]' >&2; exit 1 ;;
esac

docker info >/dev/null
# Compose reads the API URL from .env or the current shell environment.
docker compose config --quiet
api_url=$(docker compose config --format json | node --input-type=commonjs -e '
let input = "";
process.stdin.on("data", chunk => input += chunk);
process.stdin.on("end", () => process.stdout.write(JSON.parse(input).services.app.build.args.VITE_POKE_API_BASE_URL));
')

image=pokemon-trainer-app:1.0
docker buildx build --platform "linux/$architecture" \
  --build-arg "VITE_POKE_API_BASE_URL=$api_url" \
  -t "$image" --load .
docker run --rm --platform "linux/$architecture" "$image" nginx -t

# Check the served application and a client-side route before exporting.
container_id=$(docker run -d --platform "linux/$architecture" "$image")
cleanup() { docker rm -f "$container_id" >/dev/null 2>&1 || true; }
trap cleanup EXIT HUP INT TERM
attempt=0
until docker exec "$container_id" wget -q -O /tmp/home.html http://127.0.0.1/; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 10 ]; then docker logs "$container_id"; exit 1; fi
  sleep 1
done
docker exec "$container_id" sh -c '
  wget -q -O /tmp/team.html http://127.0.0.1/equipos &&
  cmp /tmp/home.html /tmp/team.html &&
  test -s /usr/share/nginx/html/favicon.svg &&
  test -d /usr/share/nginx/html/assets
'
cleanup
trap - EXIT HUP INT TERM

output_dir="delivery/$architecture"
mkdir -p "$output_dir"
docker save -o "$output_dir/pokemon-trainer-app.tar" "$image"
cp docker/INSTRUCCIONES.md "$output_dir/INSTRUCCIONES.md"
printf 'Ready to send: %s/pokemon-trainer-app.tar and %s/INSTRUCCIONES.md\n' "$output_dir" "$output_dir"
