type User = {
    uuid: string,
    firstname: string,
    lastname: string,
    phone: string,
    role: "USER" | "SELLER" | "BEACH_MANAGER" | "ADMIN",
}

type Good = {
    uuid: string,
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
    uuid: string,
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
    tags: Array<string>,
    goods: Array<Good>,
    inn: string,
    photosUrl: Array<string>,
}

type Order = {
    buyerUid: string,
    sellerUid: string,
    goods: Array<OrderedGood>,
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
    senderUuid: string,
    text: string,
    time: string
}

type Chat = {
    messages: Array<Message>
}

type Notification = {
    timestamp: string,
    text: string,
}

type BeachState = {
    imageUrl: string,
    name: string,
}

type Beach = {
    currentState: BeachState,
    waterTemperature: number,
    airTemperature: number,
    wind: {
        speed: number,
        direction: number,
    },
    dolphins: {
        speed: number,
        direction: number,
    },
    woman: {
        beautifulPercent: number,
        smartPercent: number,
    },
    jellyfishIndex: number,
    seaWeedIndex: number,
}

export type {
    User,
    Good,
    OrderedGood,
    Seller,
    Order,
    Coupon,
    Event,
    Place,
    Message,
    Chat,
    Notification,
    BeachState,
    Beach
};

export interface Action {
    type: string,
    payload: any
}