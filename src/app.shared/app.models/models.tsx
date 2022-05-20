type User = {
    uid: string,
    firstname: string,
    lastname: string,
    phone: string,
    role: "USER" | "SELLER" | "BEACH_MANAGER" | "ADMIN",
}

type Good = {
    uid: string,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
}

type OrderedGood = {
    good: Good,
    quantity: number,
}

type Seller = {
    uid: string,
    legalEntityName: string,
    phone: string,
    workTime: string,
    gps: {
        latitude: number,
        longitude: number,
    },
    dynamic: boolean,
    cashier: {
        firstname: string,
        lastname: string,
        photoUrl: string,
    }
    tags: [string],
    goods: [Good],
    inn: string,
    photosUrl: [string],
}

type Order = {
    buyerUid: string,
    sellerUid: string,
    goods: [OrderedGood],
    totalPrice: number,
    status: "PLACED" | "FINISHED" | "CANCELLED",
    createdAt: string,
    closedAt: string
}

type Coupon = {
    name: string,
    description: string,
    percent: number
}

type Event = {
    name: string,
    description: string,
    time: string,
    photoUrl: string,
    gps: {
        latitude: number,
        longitude: number,
    }
}

type Place = {
    name: string,
    description: string,
    photoUrl: string,
    gps: {
        latitude: number,
        longitude: number,
    }
}

type Message = {
    senderUid: string,
    text: string,
    time: string
}

type Chat = {
    messages: [Message]
}

export type {
    User
};

export interface Action {
    type: string,
    payload: any
}