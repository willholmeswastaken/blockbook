import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import UserRepository from '../../database/UserRepository';

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const jwt = (req["headers"] as any)["authorization"].split(" ")[1];
    const { address } = verify(jwt, "PRATHAM") as any;
    const { username } = JSON.parse(req.body);

    console.log(`Updating username for address ${address} to ${username}`);
    const userRepository = new UserRepository();
    const user = await userRepository.updateUser(address, username);
    return res.status(200).send({ user });
}

export default updateUser;