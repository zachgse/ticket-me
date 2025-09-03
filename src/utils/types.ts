export type Ticket = {
    id: string;
    title: string;
    category: string;
    content: string;
    status: "pending" | "processing" | "completed";
    conversation: any;
    creator: {
        name: string;
        email: string;
    };
    createdAt: Date;
    updatedAt: Date;
};