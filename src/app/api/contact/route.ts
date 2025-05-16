import { db } from '@/lib/db';

export async function GET() {
    try {
        const contacts = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM contact ORDER BY id DESC', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        return new Response(JSON.stringify({ message: 'Get all contact Forms successfully', contacts }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(request) {
    try {
        const body = await request.json();
        const { id } = body;
        if (!id) {
            return new Response(JSON.stringify({ message: 'Missing Contact ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const result = await new Promise((resolve, reject) => {
            db.query('DELETE FROM contact WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ message: 'Contact not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: 'Contact deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


export async function POST(req) {
    try {
        const { username, email, phone,  message } = await req.json();

        if (!username || !phone || !email || !message) {
            return new Response(JSON.stringify({ message: 'All fields required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        // Wrap db.query in a Promise
        await new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO contact (name, email, phone, message) VALUES (?, ?, ?, ?)',
                [username, email, phone, message],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });

        return new Response(JSON.stringify({ message: 'Contact Form Submit successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
