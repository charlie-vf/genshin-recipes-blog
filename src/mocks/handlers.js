import { rest } from "msw"

const baseURL = 'https://genshin-food-blog-api.herokuapp.com/'

export const handlers =[
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json({
            "pk": 1,
            "username": "felix",
            "email": "",
            "first_name": "",
            "last_name": "",
            "profile_id": 1,
            "profile_image": "https://res.cloudinary.com/mythlology/image/upload/v1/media/../ei-miko-cooking_mkhllz"
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];