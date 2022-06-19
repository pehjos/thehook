import React from 'react'
import Image from "next/image";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";
function Account({ providers }) {
    console.log(providers)
return (
<div>
<Head>
<title>hookwall</title>
<link rel="icon" href="/favicon.ico" />
</Head>     

{/* {Object.values(providers).map((provider) => ( */}
<div key="{provider.name}">
<div className="">
<button
className=""
onClick={() => signIn("google", { callbackUrl: "/" })}
>
Sign in
</button>
</div>
</div>
{/* ))} */}

</div>
)
}

export default Account

// export async function getServerSideProps(context) {
// const providers = await getProviders();

// return {
// props: {
// providers,
// },
// };
// }