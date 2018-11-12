docker-compose down -t 20 
docker-compose build -t 20
docker-compose up -d -t 20
sleep 10
docker ps  | head -2 | tail -1 | awk '{print $1}' | docker logs  $(</dev/stdin) -f
