package io.jahiduls.rabbitmq;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Profile("producer")
@Service
public class Producer {

    private static final String QUEUE_NAME = "hello";

    private static long count = 1;

    private final RabbitTemplate rabbitTemplate;

    public Producer(RabbitTemplate template) {
        rabbitTemplate = template;
    }

    @Scheduled(fixedDelay = 1000L)
    public void sendMessage() {
        final CustomMessage message = new CustomMessage();
        message.priority = count++;
        message.message = "Hello from Java RabbitMQ!";
        System.out.println(" [x] Sending <" + message + ">");
        rabbitTemplate.convertAndSend("", QUEUE_NAME, message);
    }

}
