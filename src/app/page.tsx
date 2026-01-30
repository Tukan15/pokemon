import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto w-full py-16 px-12 flex flex-col md:flex-row gap-24">
        
        <aside className="w-full md:w-64 space-y-12">
          <section>
            <h2 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-6">Filters</h2>
            <div className="relative border-b border-gray-200 pb-2 flex items-center">
              <span className="mr-2 opacity-40">🔍</span>
              <input type="text" placeholder="Search..." className="w-full outline-none text-sm" />
            </div>
          </section>

          <section>
            <label className="block text-gray-700 font-bold text-[11px] mb-3 uppercase tracking-tighter">Pokemon Types</label>
            <select className="w-full border border-gray-200 rounded-md p-3 text-sm text-gray-400 bg-white outline-none">
              <option>Select...</option>
            </select>
          </section>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="caught" className="w-4 h-4 rounded border-gray-300 accent-poke-blue" />
            <label htmlFor="caught" className="text-xs font-semibold text-gray-600 cursor-pointer">
              Only show caught Pokemon
            </label>
          </div>
        </aside>

        <section className="flex-1">
          <div className="grid grid-cols-[1.5fr_1fr_1fr_120px] px-6 mb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Name</span>
            <span>Type</span>
            <span>Status</span>
            <span></span>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_120px] items-center border border-gray-100 rounded-xl p-3 pl-8 shadow-sm transition-all hover:border-poke-blue/30">
               <span className="text-sm font-semibold text-gray-700">Charizard</span>
               <span className="text-sm text-gray-400">Fire</span>
               <span className="text-sm text-gray-300">-</span>
               <button className="bg-poke-blue text-white text-[13px] py-2 px-6 rounded-md font-bold hover:brightness-110 transition-all">
                 Catch
               </button>
            </div>

            <div className="grid grid-cols-[1.5fr_1fr_1fr_120px] items-center border border-poke-yellow rounded-xl p-3 pl-8 shadow-sm bg-white">
               <span className="text-sm font-semibold text-gray-700">Charizard</span>
               <span className="text-sm text-gray-400">Fire</span>
               <span className="text-sm text-poke-yellow italic font-bold">Caught</span>
               <button className="bg-poke-yellow text-white text-[13px] py-2 px-6 rounded-md font-bold hover:brightness-110 transition-all">
                 Release
               </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}