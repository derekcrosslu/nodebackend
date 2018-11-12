docker ps  | head -2 | tail -1 | awk '{print $1}' | docker logs  $(</dev/stdin) -f
