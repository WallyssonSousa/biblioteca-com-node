import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify();

const database = new DatabasePostgres

server.post('/videos', async (request, response) => {

    const {title, descricao, duracao} = request.body

    await database.create({
        title, 
        descricao,
        duracao, 
    });

    return response.status(201).send();
})

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search);

    return videos
})

server.put('/videos/:id', async (request, response) => {
     const videoId = request.params.id

     const {title, descricao, duracao} = request.body;

    await database.update(videoId, {
        title,
        descricao,
        duracao,
     });

    return response.status(204).send();
})

server.delete('/videos/:id', (request, response) => {
    const videoId = request.params.id

    database.delete(videoId)
    
    return response.status(204).send();
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
}) 
