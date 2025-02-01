import Link from 'next/link';
import Sidebar from "@/app/components/Sidebar";

function HomeDash() {
  return (<>
    {/* <main className={`flex-1 transition-all duration-300 p-4`} style={{ marginLeft: '16rem' }}> */}
    <Sidebar />
    {/* </main> */}
    <div className="grid ">
      <div className="w-10 h-10 rounded-full  justify-self-end bg-white">
        Miguel
      </div >
      <div className="grid grid-cols-4 gap-3 mt-12 place-content-between bg-red-400">
        <div className="w-32 h-32 bg-blue-500 mx-auto">
          <Link href="/dashboard/clientes">Clientes</Link>
        </div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
        <div className="w-32 h-32 bg-blue-500 mx-auto"></div>
      </div>
    </div>
  </>);
}

export default HomeDash;