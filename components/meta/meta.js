import React from "react";
import Head from "next/head";

const Meta = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link
        href="https://fonts.googleapis.com/css?family=Nunito:400,700,900&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
  );
};

export default Meta;
