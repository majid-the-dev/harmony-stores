export const POST = async (req) => {
    const { reference } = await req.json();
    console.log(reference);
    try {
        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference.reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            return new Response('Transaction verification failed', { status: 400 });
        }

        const { data } = await response.json();

        console.log(data);

        if (data.status === "success") {
            return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } else {
            return new Response('Transaction verification failed', { status: 400 });
        }
    } catch (error) {
        console.error('Transaction verification error:', error);
        return new Response('An error occurred during transaction verification', { status: 500 });
    }
}
