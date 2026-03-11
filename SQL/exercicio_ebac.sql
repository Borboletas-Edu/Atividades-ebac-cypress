SELECT * 
FROM film_category
INNER JOIN film 
    ON film_category.film_id = film.film_id;

/* Atividade 02 - Faça uma consulta que retorne a lista de todos os atores com o número filmes que cada ator participou. 
Ordene a lista pelo numero de filmes, iniciando pelos atores que mais atuaram.*/
SELECT 
    actor.first_name,
    COUNT(film_actor.film_id) AS quantidade_filmes
FROM actor 
INNER JOIN film_actor 
    ON actor.actor_id = film_actor.actor_id
GROUP BY actor.actor_id, actor.first_name, actor.last_name

ORDER BY quantidade_filmes DESC;

/* Atividade 03 -  Faça uma consulta que retorne a lista de atores que atuaram em filmes com mais de duas horas de duração (120min). 
Ordene a lista pelo numero de filmes que cada ator participou. */
SELECT 
    actor.first_name,
    actor.last_name,
    COUNT(film_actor.film_id) AS quantidade_filmes
FROM actor 
INNER JOIN film_actor 
    ON actor.actor_id = film_actor.actor_id
INNER JOIN film
    ON film.film_id = film_actor.film_id
WHERE film.length >= 120
GROUP BY actor.actor_id, actor.first_name, actor.last_name
ORDER BY quantidade_filmes DESC;


/* Atividade 04 - Crie uma consulta para cada consulta do exercício anterior que retorne o numero de registros encontrados pela busca */
SELECT COUNT(*) AS total_relacoes
FROM film_category
INNER JOIN film 
    ON film_category.film_id = film.film_id;

SELECT COUNT(*) AS total_atores_filmes 
FROM (
    SELECT 
    actor.first_name,
    COUNT(film_actor.film_id) AS quantidade_filmes
    FROM actor 
    INNER JOIN film_actor 
        ON actor.actor_id = film_actor.actor_id
    GROUP BY actor.actor_id, actor.first_name, actor.last_name
) AS resultado;

SELECT COUNT(*) AS total_atores_filmes_120_min_mais 
FROM (
    SELECT 
        actor.actor_id
    FROM actor 
    INNER JOIN film_actor 
        ON actor.actor_id = film_actor.actor_id
    INNER JOIN film
        ON film.film_id = film_actor.film_id
    WHERE film.length >= 120
    GROUP BY actor.actor_id
) AS resultado;