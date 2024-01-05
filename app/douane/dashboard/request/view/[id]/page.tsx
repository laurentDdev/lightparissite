import React from 'react';

const Page = ({params}: {params: {id: string}}) => {
    return (
        <div>
            <h1>Page request view : {params.id}</h1>
        </div>
    );
};

export default Page;
