import Logo from "@/app/_components/block/Logo";

export default function Header() {
  return (
    <header className="flex flex-col gap-2 pt-4 pb-[8px] border-b border-slate-400 bg-white/30 backdrop-blur-sm fixed w-full z-50">
      <div className="flex items-center gap-10 pl-6">
        <Logo href="/products" width={200} />
        <div className="flex justify-center flex-1">
          {/* <h1 className="text-3xl font-bold">MY도기</h1> */}
        </div>
      </div>
    </header>
  );
}
