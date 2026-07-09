class MessageQueue {
    constructor() {
        this.queue = [];
        this.mutex = new Promise(resolve => this.resolveMutex = resolve);
    }

    // Enqueue a message
    async enqueue(message) {
        await this.mutex;
        try {
            this.queue.push(message);
        } finally {
            this.resolveMutex();
        }
    }

    // Dequeue a message
    async dequeue() {
        await this.mutex;
        try {
            while (this.queue.length === 0) {
                await new Promise(resolve => this.resolveWait = resolve);
            }
            return this.queue.shift();
        } finally {
            this.resolveMutex();
        }
    }
}