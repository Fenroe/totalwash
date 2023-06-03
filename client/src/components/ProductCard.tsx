import { Product } from '@/types'
import React from 'react'

export const ProductCard = ({
    product,
}: {
    product:Product,
}) => {
    return (
        <div className="p-3 hover:border border-black rounded-md">
          <button className="">
            <img className="w-full aspect-[4/5] object-cover"src={product.photos[0]}/>
            <div className="w-full min-h-[10rem]">
              <h2 className="font-bold text-xl my-3">{product.name}</h2>
            </div>
            
          </button>
          <div className="my-3 text-xl">
            {!product.isOnSale ?
            <span>{`£${product.currentPrice}`}</span>
            :
            <>
                <span className="line-through">{`£${product.fullPrice}`}</span>
                <span className="text-blue-500">{` £${product.currentPrice}`}</span>
            </>  
            }
          </div>
          <div className="flex sm:flex-row gap-3 my-6 flex-col">
            <button className="flex-1 border py-3 uppercase bg-white text-black rounded-md border-black font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">More Details</button>
            <button className="flex-1 border py-3 uppercase bg-blue-500 text-white rounded-md border-black font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">Add to Cart</button>
          </div>
        </div>
    )
}
