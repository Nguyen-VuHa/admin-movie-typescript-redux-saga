
interface TurnOver {
    totalNetAmount: number
}

export interface DashBoard {
    countMemberShip: number,
    turnOver: TurnOver | null,
    countMovieMew: number,
    countCommentAndRate: number,
    loadingOverView: boolean,
    errorMessage: string,
}