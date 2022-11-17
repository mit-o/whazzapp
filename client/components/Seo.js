import Head from "next/head";

const Seo = ({ title, description, img }) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={img} />
    </Head>
  );
};

export default Seo;
