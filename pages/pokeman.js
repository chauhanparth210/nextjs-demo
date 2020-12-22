import Layout from "../components/Layout";
import Link from "next/link";

const Pokeman = ({ pokeman }) => {
  return (
    <Layout
      title={`${pokeman.name.slice(0, 1).toUpperCase()}${pokeman.name.slice(
        1
      )}`}
    >
      <h1 className="text-4xl mb-2 text-center capitalize">{pokeman.name}</h1>
      <img className="mx-auto" src={pokeman.image} alt={pokeman.name} />
      <p>
        <span className="font-bold mr-2">Weight</span> : {pokeman.weight}
      </p>
      <p>
        <span className="font-bold mr-2">height</span> : {pokeman.height}
      </p>
      <h2 className="mt-6 mb-2 text-2xl">Types</h2>
      {pokeman.types.map((type, index) => (
        <p key={index}> {type.type.name}</p>
      ))}
      <p className="mt-10 text-center font-bold underline text-xl">
        <Link href="/">
          <a>{"<"} Home</a>
        </Link>
      </p>
    </Layout>
  );
};

export default Pokeman;

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedId = ("00" + id).slice(-3);
    pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return {
      props: { pokeman },
    };
  } catch (err) {
    console.error(err);
  }
}
