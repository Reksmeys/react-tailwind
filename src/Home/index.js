import { useEffect, useState } from "react";
import Article from "../components/Article";
import Cards from "../components/Cards";
import Loadings from "../components/Loadings";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/actions/productActions";
import computer from '../lotties/computer.json'
import Lottie from "lottie-react";

function Home() {
  // requesting action
  const dispatch = useDispatch();

  // received global state
  let { products, isLoading } = useSelector((state) => state.productR);

  // Intent to Subscription
  useEffect(() => {
    dispatch(fetchAllProducts(12, 0));
  }, []);

  return (
    <>
      <main className="pt-10 dark:bg-gray-900">
        <section class="bg-white dark:bg-gray-900">
          <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto place-self-center lg:col-span-7">
              <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  Better Data
                </span>{" "}
                Scalable AI.
              </h1>
              <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Here at Flowbite we focus on markets where technology,
                innovation, and capital can unlock long-term value and drive
                economic growth.
              </p>

              <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                From checkout to global sales tax compliance, companies around
                the world use Flowbite to simplify their payment stack.
              </p>
              <a
                href="#"
                class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Get started
                <svg
                  class="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Speak to Sales
              </a>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <Lottie animationData={computer} />
            </div>
          </div>
        </section>
        <section className="container mx-auto mt-11">
          <h1
            className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center mt-10"
            style={{ marginTop: 100 }}
          >
            We invest in popular products
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
          {/* loop data from product to cards */}
          <section className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <Loadings />
            ) : (
              products.length > 0 &&
              products.map((product) => (
                <Cards
                  key={product.id}
                  url={product.images[0]}
                  desc={product.title}
                  id={product.id}
                  price={product.price}
                />
              ))
            )}
          </section>
        </section>
        <Article />
      </main>
    </>
  );
}
export default Home;
