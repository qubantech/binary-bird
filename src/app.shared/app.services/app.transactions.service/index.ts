import { AxiosResponse } from "axios";
import { $api, ENDPOINTS } from "../app.http.service";
import { TransactionDto } from "./dto";
import { Balance } from "./models";

class TransactionsService {
    async doTransaction(
        senderUuid: string,
        receiverUuid: string,
        hash: string,
        amount: number
    ): Promise<AxiosResponse<TransactionDto>> {
        return $api.post(ENDPOINTS.POST_DO_TRANSACTION(senderUuid, receiverUuid, hash, amount))
    }

    async getUserTransactions(userUuid: string): Promise<AxiosResponse<Array<TransactionDto>>> {
        return $api.get(ENDPOINTS.GET_USER_TRANSACTIONS(userUuid))
    }

    async getTransactionsByHash(transactionHash: string): Promise<AxiosResponse<TransactionDto>> {
        return $api.get(ENDPOINTS.GET_TRANSACTIONS_BY_HASH(transactionHash))
    }

    async getSellerTransactions(sellerUuid: string): Promise<AxiosResponse<Array<TransactionDto>>> {
        return $api.get(ENDPOINTS.GET_SELLER_TRANSACTIONS(sellerUuid))
    }

    async depositToBalance(balanceUuid: string, amount: number): Promise<AxiosResponse<Balance>> {
        return $api.post(ENDPOINTS.POST_DEPOSIT_TO_BALANCE(balanceUuid, amount))
    }

    async getUserBalance(balanceUuid: string): Promise<AxiosResponse<Balance>> {
        return $api.get(ENDPOINTS.GET_USER_BALANCE(balanceUuid))
    }
}

export const transactionsService = new TransactionsService()
