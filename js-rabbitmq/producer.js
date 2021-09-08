#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq.jahiduls.io/playground', (connErr, conn) => {
    if (connErr) throw connErr;

    conn.createChannel((err, channel) => {
        if (err) throw err;

        const queue = 'hello';
        const message = 'Hello, World!';

        channel.assertQueue(queue, {
            durable: false
        }, (err, ok) => {
            if (err) throw err;

            console.info(` [*] Assert queue: ${JSON.stringify(ok)}`);
            console.log(` [*] Producing messages to queue: ${queue}`);

            channel.sendToQueue(queue, Buffer.from(message));
            console.log(` [-] sent ${message}`);

            setTimeout(() => {
                conn.close();
                process.exit(0);
            }, 500);
        });
    });
});
