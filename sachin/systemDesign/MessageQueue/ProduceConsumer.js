// Producer function
function producer(messageQueue, messageType, payload) {
    let message = { messageType: messageType, payload: payload };

    messageQueue.enqueue(message);
}

// Consumer function
function consumer(messageQueue) {
    while (true) {
        let message = messageQueue.dequeue();
        // Process the message
        // ...
    }
}