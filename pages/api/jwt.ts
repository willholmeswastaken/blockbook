import { ethers } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import UserAuthRepository from '../../database/UserAuthRepository';

const jwt = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body);
    const { address, signedChallenge } = body;
    const userAuthRepository = new UserAuthRepository();
    const expectedChallenge = await userAuthRepository.getAuth(address);
    if(expectedChallenge === null)
        return res.status(404).json({ message: 'No challenge found for address '});
    
    const verifiedAddress = ethers.utils.verifyMessage(
        expectedChallenge,
        signedChallenge
    );
    if(verifiedAddress.toLowerCase() !== address.toLowerCase())
        return res.status(401).json({
            message: 'Challenge verification failed. This request has been denied.'
        });
    
    const token = sign({ address }, "PRATHAM");
    return res.status(200).json({ token });
}

export default jwt;