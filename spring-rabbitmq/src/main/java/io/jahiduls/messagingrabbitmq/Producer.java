package io.jahiduls.messagingrabbitmq;

import java.util.concurrent.TimeUnit;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Producer implements CommandLineRunner {

    private final RabbitTemplate rabbitTemplate;
    private final Consumer consumer;

    public Producer(Consumer consumer, RabbitTemplate rabbitTemplate) {
        this.consumer = consumer;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println(" [x] Sending message...");
        rabbitTemplate.convertAndSend(MessagingRabbitmqApplication.TOPIC_EXCHANGE_NAME, "foo.bar.baz", "Hello from Spring RabbitMQ!");

        consumer.getLatch().await(10000, TimeUnit.MILLISECONDS);
    }
}
