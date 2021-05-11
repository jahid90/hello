package io.jahiduls.rabbitmq;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Profile("consumer")
@Slf4j
@Service
public class Consumer {

    @RabbitListener(queues = AppConfig.QUEUE)
    public void receiveMessage(final CustomMessage message) {
        log.info(" [x] Received <{}>", message);
    }

}
