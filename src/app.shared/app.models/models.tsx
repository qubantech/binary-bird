type User = {
    uuid: string,
    firstname: string,
    lastname: string,
    phone: string,
    role: "" | "USER" | "SELLER" | "BEACH_MANAGER" | "ADMIN",
}

type Good = {
    uuid: string,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
}
type GoodCreateDto = Omit<Good, "uuid">

type OrderedGood = {
    good: Good,
    quantity: number,
}
type OrderedGoodCreateDto = Omit<OrderedGood, "uuid">


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
    },
    tags: Array<string>,
    goods: Array<Good>,
    inn: string,
    photosUrl: Array<string>,
}
type OrderStatus = "PLACED" | "FINISHED" | "CANCELLED"
type Order = {
    uuid: string,
    buyerUid: string,
    sellerUid: string,
    goods: Array<OrderedGood>,
    totalPrice: number,
    status: OrderStatus,
    createdAt: string,
    closedAt: string
}
type OrderCreateDto = Omit<Order, "uuid" | "status">


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
    token: "best" | "good" | "normal" | "bad",
    name: string,
    imageUrl: string,
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
    Beach,

    GoodCreateDto,
    OrderedGoodCreateDto,
    OrderCreateDto,

    OrderStatus,
};

export interface Action {
    type: string,
    payload: any
}