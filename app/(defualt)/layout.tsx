import queryOptions from "@/app/service/category/queryOptions";
import Header from "./_components/Header";
import PrefetchHydration from "../_shared/components/PrefetchHydration/PrefetchHydration";

export default function defualtLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queries = [queryOptions.all("product")];
  return (
    <PrefetchHydration queries={queries}>
      <Header />
      {children}
    </PrefetchHydration>
  );
}
