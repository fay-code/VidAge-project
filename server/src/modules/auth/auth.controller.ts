import {Request, Response} from "express";
import { StatusCodes } from "http-status-codes";
import omit from "../../helpers/omit";
import { findUserByEmail } from "../user/user.service";
import { Loginbody } from "./auth.schema";
import { signJwt } from "./auth.utils";

export async function loginHandler(req: Request<{}, {}, Loginbody>, res: Response) {
    
    const {email, password} = req.body;

    // finding user by email
    const user = await findUserByEmail(email);

    // verifying user password
    if (!user || !user.comparePassword(password)) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Invalid email or password!");
    }

    const payload = omit(user.toJSON(), ['password', '__v']);

    // signing JWT (JSON Web Token)
    const jwt = signJwt(payload);

    res.cookie("accessToken", jwt, {
        // adding cookie to responsing
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
    });

    return res.status(StatusCodes.OK).send(jwt);
}