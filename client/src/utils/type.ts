export interface Group {
    _id: string
    groupName: string
    members: string[]
    expenses: string[]
    createdBy: string
}
export interface User {
    _id: string
    fullName: string
    userName: string
    email: string
    groups: Group[]
    createdAt?: Date
    updatedAt?: Date
}


export interface Split {
    from: string
    to: string
    amount: number
}

export interface Login {
    email: string
    password: string
}

export interface Expense {
    _id: string
    title: string
    amount: number
    description: string
    group: string
    paidBy: {
        userName: string
        _id: string
    }
    createdAt: string
    updatedAt: string
}