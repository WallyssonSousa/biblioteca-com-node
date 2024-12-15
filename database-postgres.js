import { randomUUID } from 'crypto';
import  cliente  from './db.js';

export class DatabasePostgres {
    async list(search) {
        let videos;
        
        if (search) {
            videos = await cliente.query(`SELECT * FROM videos WHERE title LIKE $1`, [`%${search}%`]);
        } else {
            videos = await cliente.query('SELECT * FROM videos');
        }
    
        return videos.rows;  
    }

    async create(video){
        const videoId = randomUUID();  

        const { title, descricao, duracao } = video;


        const query = `
            INSERT INTO videos (id, title, descricao, duracao)
            VALUES ($1, $2, $3, $4);
        `;
        const values = [videoId, title, descricao, duracao];

   
        await cliente.query(query, values);
    }

    async update(id, video) {
        const { title, descricao, duracao } = video;
    
        const query = `
            UPDATE videos
            SET title = $1, descricao = $2, duracao = $3
            WHERE id = $4;
        `;
        const values = [title, descricao, duracao, id];
    
        await cliente.query(query, values);
    }
    
    
    async delete(id) {
        const query = `DELETE FROM videos WHERE id = $1`;
        const values = [id];
    
        await cliente.query(query, values);
    }
    

    
}