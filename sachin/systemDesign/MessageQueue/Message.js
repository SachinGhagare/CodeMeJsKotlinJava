class Message {
    constructor(messageType, payload) {
		console.log("Message constructor called with messageType:", messageType, "and payload:", payload);
        this.messageType = messageType;
        this.payload = payload;
    }
    // Add any other fields as needed
}