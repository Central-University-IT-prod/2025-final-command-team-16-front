import React from "react";
import ClientBook from "./ClientBook";

const Page = async ({ params }) => {
    const { bookId } = await params;
    return <ClientBook bookId={bookId} />;
};

export default Page;
