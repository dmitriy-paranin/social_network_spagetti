import {ActionsType, AddPostActionType, PostType, UpdateNewPostTextActionType} from "./store";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you!', likesCount: 6},
        {id: 2, message: 'Don\'t worry', likesCount: 10},
        {id: 3, message: 'It\'s my first post superstar', likesCount: 12},
    ],
    newPostText: '',
};

const profileReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0,
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state};
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }
};

export const addPostActionCreator = (): AddPostActionType => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text: string): UpdateNewPostTextActionType => ({type: UPDATE_NEW_POST_TEXT, newText: text});

export default profileReducer;