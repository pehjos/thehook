import React from 'react'
import Image from "next/image";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";
function Account({ providers }) {
    console.log(providers)
return (
<div>
<Head>
<title>create account with hookwall</title>
<link rel="icon" href="/favicon.ico" />
</Head>     
<div className='account'>
<h4>Create thehook account</h4>
<p>share your opinions with the world!
create post and share with others through our platform,
we protect your data .


</p>
<Image
src="/lg.png"
width={180}
height={180}
alt="the latest news about USA"
/>
{Object.values(providers).map((provider) => (
<div key={provider.name}>
<div className="button">

<button

onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                
>
Sign in with {provider.name}
</button>
</div>
</div>
))}
</div>
</div>
)
}

export default Account

export async function getServerSideProps(context) {
const providers = await getProviders();

return {
props: {
providers,
},
};
}