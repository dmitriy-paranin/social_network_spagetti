import {AddPostActionType, UpdateNewMessageBodyActionType, UpdateNewPostTextActionType} from "./store";
import {sendMessageCreator} from "./dialogs-reducer";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

export type ActionsType =
    AddPostActionType
| UpdateNewPostTextActionType
| UpdateNewMessageBodyActionType
| AddMessageType
| FollowType
| UnfollowType
| SetUsersType
export type AddMessageType = ReturnType<typeof sendMessageCreator>
export type FollowType = ReturnType<typeof followAC>
export type UnfollowType = ReturnType<typeof unfollowAC>
export type SetUsersType = ReturnType<typeof setUsersAC>



export type UserLocationType = {
    city: string
    country: string
}
export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string,
    location: UserLocationType
}
export type InitialStateType = {
    users: Array<UserType>
}


let initialState: InitialStateType = {
    users: [ ]
};

const usersReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.users]}
        }
                default:
            return state;
    }
};

export const followAC = (userId: number) => ({type: FOLLOW, userId}) as const;
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId}) as const;
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users}) as const;

export default usersReducer;