import axios from 'axios'


export const API_URL = 'https://api.quban.tech'

export const ENDPOINTS = {
    POST_DO_TRANSACTION: (
        senderUuid: string,
        receiverUuid: string,
        hash: string,
        amount: number
    ) => `${API_URL}/transactions/transfer/${senderUuid}/${receiverUuid}/${hash}/${amount}`,
    GET_USER_TRANSACTIONS: (userUuid: string) => `${API_URL}/transactions/user/${userUuid}`,
    GET_TRANSACTIONS_BY_HASH: (transactionHash: string) => `${API_URL}/transactions/status/${transactionHash}`,
    GET_SELLER_TRANSACTIONS: (sellerUuid: string) => `${API_URL}/transactions/seller/${sellerUuid}`,
    POST_DEPOSIT_TO: (
        balanceUuid: string,
        amount: number
    ) => `${API_URL}/balances/deposit/${balanceUuid}/${amount}`,
    GET_USER_BALANCE: (balanceUuid: string) => `${API_URL}/balances/${balanceUuid}`,
}

export const $api = axios.create({
    headers: {
        'Access-Control-Allow-Credentials': '*',
    },
    withCredentials: true,
})