export const getChallenge = async(address: string) : Promise<string> => {
    const challengeRequest = await fetch('api/challenge', {
        method: 'POST',
        body: JSON.stringify({
            address
        })
    });
    if(challengeRequest.status !== 200)
        throw new Error(`Failed to fetch challenge, status code ${challengeRequest.status}`);

    const { challenge } = await challengeRequest.json();
    return challenge;
}

export const getJwt = async(address: string, signedChallenge: string) : Promise<string> => {
    const jwtRequest = await fetch('/api/jwt', {
        method: 'POST',
        body: JSON.stringify({
          address,
          signedChallenge: signedChallenge,
        }),
      });

      if (jwtRequest.status !== 200)
        throw new Error(`Failed to fetch jwt, status code  ${jwtRequest.status}`);

      const { token } = await jwtRequest.json();
      console.log("Got token = ", token);
      return token;
}