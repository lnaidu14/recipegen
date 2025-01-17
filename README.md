# How to run DB:

To run the PostgreSQL database, type in the command:

```console
docker compose up -d
```

To open the interactive terminal of the container:

- Find the container ID of the container

```console
docker ps
```

- Then run the command

```console
docker exec -it <container_id> bash
```

To run `psql`, run

```console
psql -h localhost -p 5432 -U postgres

```

To connect to the database:

- Type in `\l` to get a list of all the databases.
- Then type `\c <database_name>`, in this case the name of the database would be "recipegen_db".

```console
\l
\c recipegen_db
```
