import { NextApiResponse, NextApiRequest } from "next";
import UserAuthRepository from "../../database/UserAuthRepository";

const challenge = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body);
    console.log(body);
    console.log(`In the server, generating challenge for address ${body.address}`);

    const userAuthRepository = new UserAuthRepository();
    const challenge = await userAuthRepository.setAuth(body.address);
    return res.status(200).json({ challenge });
}

export default challenge;