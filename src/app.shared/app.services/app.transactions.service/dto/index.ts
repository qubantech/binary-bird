export interface TransactionDto {
    id: number,
    senderUuid: string,
    receiverUuid: string,
    hash: string,
    timestamp: string,
    amount: number,
}