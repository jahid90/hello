const amqp = require('amqplib');

const queue = 'hello';

amqp.connect('amqp://rabbitmq.jahiduls.io/playground')
    .then((conn) => {
        return conn.createChannel();
    })
    .then((channel) => {
        return channel.assertQueue(queue)
            .then((ok) => {
                console.info(`Listening for messages on queue <${queue}>. Press Ctrl+C to exit.`);
                return channel.consume(queue, (msg) => {
                    console.info(` [x] Received <${JSON.stringify(JSON.parse(msg.content))}>`);
                    channel.ack(msg);
                });
            });
    })
    .catch(console.warn);
