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
                    const message = {
                        message: 'Hello World from JS RabbitMQ!',
                        priority: count++
                    };
                    console.info(` [x] Sending <${JSON.stringify(message)}>`);
                    return channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
                }, 1000);
            });
    })
    .catch(console.warn);
