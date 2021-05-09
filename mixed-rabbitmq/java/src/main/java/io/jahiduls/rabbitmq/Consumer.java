package io.jahiduls.rabbitmq;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class Consumer {

    @RabbitListener(queues = AppConfig.QUEUE)
    public void receiveMessage(final CustomMessage message) {
        System.out.println(" [x] Received <" + message + ">");
    }

}
