import Head from "next/head";
import Layout from "../components/Layout";

export default function Home({ pokemon }) {
  return (
    <div>
      <Head>
        <title>Pokemon app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="NextJs Pokemon-app">
        <h1 className="text-4xl text-center mb-8">NextJs Pokemon App</h1>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((pokeman, index) => {
      const paddedId = ("00" + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...pokeman, image };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
