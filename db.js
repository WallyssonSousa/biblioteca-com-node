import fastify from "fastify";
import pkg from "pg";
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const server = fastify();

const cliente = new Client({
    user: process.env.DB_USER, 
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT,
})

cliente.connect()
    .then(() => console.log("Conectado ao banco de dados"))
    .catch(erro => console.log("Erro ao conectar com o banco de dados.", erro))

server.get('/test-connection', async (response) => {
    try {
        return response.status(200).send({sucess: true, time: res.rows[0].now });
    } catch (erro) {
        return response.status(500).send({ sucess: false, error: erro.message })
    }
});

const start = async () => {
    try {
        await server.listen({port: 4444});
    } catch (erro) {
        server.log.error(erro);
        process.exit(1);
    }
}

export default cliente;
start();