const amqp = require('amqplib');

const queue = 'hello';

amqp.connect('amqp://rabbitmq.jahiduls.io/playground')
    .then((conn) => {
        return conn.createChannel();
    })
    .then((channel) => {
        return channel.assertQueue(queue)
            .then((ok) => {
                console.info(`Prodcing messages to queue <${queue}>. Press Ctrl+C to exit.`);
                let count = 1;
                setInterval(() => {
                    const message = `Hello World from JS RabbitMQ! - ${count++}`;
                    console.info(` [x] Sending <${message}>`);
                    return channel.sendToQueue(queue, Buffer.from(message));
                }, 1000);
            });
    })
    .catch(console.warn);
