#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq.jahiduls.io/playground', (connErr, conn) => {
    if (connErr) throw connErr;

    conn.createChannel((err, channel) => {

        if (err) throw err;

        const queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(` [*] Waiting for message in queue: ${queue}. To EXIT, press Ctrl+C`);
        channel.consume(queue, (message) => {
            console.log(` [x] Received ${message.content.toString()}`);
        } , {
            noAck: true
        });

    });
})
