"use client"
import { useNavigate } from "@/hooks"
import { Product } from "@/types"

export const RenderedCartProduct = ({
    product,
}: {
    product: Product,
}) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col w-full">
            <button className="hover:underline underline-offset-4 font-medium" role="link" onClick={() => navigate(`/catalog/products/${product.slug}`)}>
                <div className="flex gap-3 flex-col xs:flex-row">
                    <img src={product.photos[0]} alt={product.name} className="w-20 h-20 object-cover" />
                    <div>
                        <h2>{product.name}</h2>
                    </div>
                </div>
            </button>
        </div>
    )
}
