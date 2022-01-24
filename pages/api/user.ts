import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import UserRepository from '../../database/UserRepository';

const user = async (req: NextApiRequest, res: NextApiResponse) => {
    const jwt = (req["headers"] as any)["authorization"].split(" ")[1];
    const { address } = verify(jwt, "PRATHAM") as any;

    const userRepository = new UserRepository();
    var user = await userRepository.getUser(address);
    if(user === null) {
        user = await userRepository.createUser(address, address);
    }
    return res.status(200).json({ user });
}

export default user;