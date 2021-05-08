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
        });

        channel.sendToQueue(queue, Buffer.from(message));
        console.log(` [x] sent ${message}`);

        setTimeout(() => {
            conn.close();
            process.exit(0);
        }, 500);
    });
});
