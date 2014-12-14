for url in $(node tile.js); do
    [ -f dataTiles/$(echo $url | tr '/' '-')} ] || wget "$url" -O dataTiles/$(echo $url | tr '/' '-')}
done
