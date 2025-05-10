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