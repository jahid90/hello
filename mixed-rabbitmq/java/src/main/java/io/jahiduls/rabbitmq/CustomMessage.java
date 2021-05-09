package io.jahiduls.rabbitmq;

import lombok.Data;

@Data
public class CustomMessage {
    public String message;
    public long priority;
}
