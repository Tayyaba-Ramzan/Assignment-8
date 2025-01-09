import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  publishedAt: string;
  imageUrl: string;
  mainImage: {
    alt: string;
  };
  bodyText: string;
}

export default async function Home() {
  const query = `*[_type == "post"] {
    id,
    title,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    mainImage { alt },
    "bodyText": body[].children[].text
  }`;

  const blogData: Post[] = await client.fetch(query);
  console.log(blogData);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="group border rounded-lg shadow-md p-4 hover:shadow-xl hover:scale-105 transform transition duration-300 flex flex-col justify-between"
          >
            <div className="relative">
              <Image
                src={item.imageUrl}
                alt={item.mainImage?.alt || `Image for ${item.title}`}
                width={400}
                height={200}
                objectFit="cover"
                className="rounded-md mb-4 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md"></div>
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-teal-600 transition-colors duration-300">
              {item.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(item.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="flex justify-center items-center mt-4">
              <Link href={`/detail/${item.id}`} passHref>
                <button
                  className="btn bg-gradient-to-r from-purple-900 to-blue-800 
                       hover:from-teal-500 hover:to-black
                       text-white px-4 py-2 rounded-md shadow-md 
                       hover:shadow-lg transition-transform 
                       duration-300 transform group-hover:scale-110 
                       focus:outline-none focus:ring-2 
                       focus:ring-teal-500 focus:ring-offset-2"
                  aria-label={`Explore more about ${item.title}`}
                >
                  Explore More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
