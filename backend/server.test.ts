import request from 'supertest';
import app from './server'; // importez votre application Express
import { describe, test, expect } from "@jest/globals"

describe('Test session', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/session');
        expect(response.statusCode).toBe(401);
    });
});

describe('Test session after login', () => {
    test('It should response the GET method', async () => {
        await request(app).post('/utilisateurs/checkUtilisateurLogins').send({ Email: 'nicolas@rabot.fs', MotDePasse: 'password' });
        const response = await
            (
                (
                    await request(app).post('/utilisateurs/checkUtilisateurLogins')
                        .send({ Email: 'nicolas@rabot.fs', MotDePasse: 'password' })
                    )
            ) 
                    await request(app).get('/session')
        expect(response.statusCode).toBe(200);
    });
});