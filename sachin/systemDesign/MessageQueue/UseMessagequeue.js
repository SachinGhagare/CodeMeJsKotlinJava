class MessageQueue {
    constructor() {
        this.queue = [];
        this.waiting = [];
    }

    // Producer sends a message
    async send(message) {
        if (this.waiting.length > 0) {
            // If a consumer is waiting, resolve it immediately
            const resolve = this.waiting.shift();
			console.log("Resolving waiting consumer with message:", message);
            resolve(message);
        } else {
            // Otherwise, push message to queue
			console.log("Enqueuing message:", message);
            this.queue.push(message);
        }
    }

    // Consumer receives a message
    receive() {
        return new Promise((resolve) => {
            if (this.queue.length > 0) {
                // If a message is available, resolve immediately
                const message = this.queue.shift();
				console.log("Consumer received message from queue:", message);
                resolve(message);
            } else {
                // Otherwise, wait until a message is available
                this.waiting.push(resolve);
            }
        });
    }
}

// Producer function
async function producer(mq, id, message) {
    console.log(`Producer ${id} sending: ${message}`);
    await mq.send(message);
}

// Consumer function
async function consumer(mq) {
    const msg = await mq.receive();
    console.log(`Consumer received: ${msg}`);
}

// Main thread logic
(async () => {
    const messageQueue = new MessageQueue();

    // Start consumer first (to simulate waiting)
    consumer(messageQueue);

    // Simulate delay before sending
    setTimeout(() => {
        // producer(messageQueue, 1, 'Hello, World!');
		producer(messageQueue, 2, 'Hello, Syed!');
		producer(messageQueue, 3, 'Hello, Ayush!');
    }, 1000);

	    // Simulate delay before sending
    setTimeout(() => {
        producer(messageQueue, 1, 'Hello, World!');
		producer(messageQueue, 2, 'Hello, Syeeeed!');
		producer(messageQueue, 3, 'Hello, Ayuuush!');
    }, 2000);
})();