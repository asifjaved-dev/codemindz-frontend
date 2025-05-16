import { db } from '../../../lib/db';

export async function POST(req) {
    try {
        const body = await req.json();
        const email = body?.email;

        if (!email) {
            return new Response(JSON.stringify({ message: 'Email required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const existingUser = await new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM newsletter WHERE email = ?',
                [email],
                (err, result) => {
                    if (err) return reject(new Error('DB_SELECT_ERROR: ' + err.message));
                    resolve(result?.[0]);
                }
            );
        });

        if (existingUser) {
            return new Response(JSON.stringify({ message: 'Email already in use' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO newsletter (email) VALUES (?)',
                [email],
                (err, result) => {
                    if (err) return reject(new Error('DB_INSERT_ERROR: ' + err.message));
                    resolve(result);
                }
            );
        });

        return new Response(JSON.stringify({ message: 'Newsletter submitted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('ERROR:', error); // Logs full error to terminal
        return new Response(JSON.stringify({ message: error.message || 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
