type Messages = Record<number, number>;
type Chats = Record<number, Messages>;

type AwaitingType = "awaiting_sticker" | "awaiting_number";
type AwaitingChats = Record<number, AwaitingType>;

interface Storage {
    random_nums: Chats;
    awaiting: AwaitingChats;
}

export { Storage };
