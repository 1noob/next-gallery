import type { NextPage } from 'next'
import cloudinary from '../utils/cloudinary'
import type { ImageProps } from '../utils/types'
import {Image} from "@nextui-org/react";
import React from "react";
import {JetBrains_Mono} from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const image_len = 160;

const Home: NextPage = ({ images }: { images: ImageProps[]}) => {

  return (
    <>
      <main className={`justify-center ${jetbrainsMono.variable} font-mono`}>
        <div className="my-auto overflow-hidden w-full h-dvh grid content-center">
          <div className="animate-[scy_60s_linear_infinite] w-max grayscale-[50%]">
              <div className="float-left grid grid-rows-8 grid-flow-col">
                { images.map(({public_id, format }) => (
                    <Image
                        key={crypto.randomUUID()}
                        radius="none"
                        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/ar_1:1,c_fill,g_auto,q_50/${public_id}.${format}`}
                        width={200}
                    />
                ))}
              </div>
              <div className="grid grid-rows-8 grid-flow-col">
                { images.map(({public_id, format }) => (
                    <Image
                        key={crypto.randomUUID()}
                        radius="none"
                        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/ar_1:1,c_fill,g_auto,q_50/${public_id}.${format}`}
                        width={200}
                    />
                ))}
              </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'desc')
    .max_results(image_len)
    .execute()
  let reducedResults: ImageProps[] = []

  for (let result of results.resources) {
    reducedResults.push({
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
  }

  for (let i = reducedResults.length; i < image_len; i++) {
    let rand_id = Math.floor(Math.random()*i);
    reducedResults.push(reducedResults.at(rand_id));
  }

  return {
    props: {
      images: reducedResults,
    },
  }
}

