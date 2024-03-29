import { SearchedProducts, PageWrapper, SectionWrapper } from "@/components";
import { Product } from "@/types";
import { Metadata } from "next";
import { getSearchParamsString } from "@/utilities";

const getProducts = async (searchParams: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?sale=true${searchParams}`,
    { next: { revalidate: 0 } },
  );
  const data = await res.json();
  const products = data?.products as Product[];
  const total = data?.total as number;
  return { products, total };
};

export const metadata: Metadata = {
  title: "Sale - TotalWash",
};

const page = async ({
  searchParams,
}: {
  searchParams: { page: string; limit: string; sortby: string };
}) => {
  const searchParamsString = getSearchParamsString(searchParams);
  const { products, total } = await getProducts(searchParamsString);
  return (
    <PageWrapper>
      <SectionWrapper>
        <h1 className="font-bold text-xl my-6">Sale</h1>
        <h2 className="text my-6">
          In the TotalWash sale you can save on a range of luxurious bathroom
          products. From freestanding baths, vanities, showers, basins and
          brassware to toasty towel rails to keep away the chill, discover all
          this and more in the TotalWash Sale. Shop now, while stocks last!{" "}
        </h2>
        <SearchedProducts products={products} total={total} />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default page;
