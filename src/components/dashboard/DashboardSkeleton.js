import Sidebar from './Sidebar'

const DashboardSkeleton = () => {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
      <Sidebar />
        <div className="flex flex-col w-full h-full bg-gray-200">
          <section className=" flex self-start px-5 w-full  bg-white animate-pulse">
            <ul className="flex flex-row w-full gap-5 py-2 px-4">
              <div className="h-[3rem] w-[6rem] bg-white rounded-xl animate-pulse" />
              <div className="h-[3rem] w-[6rem] bg-white rounded-xl animate-pulse" />
            </ul>
          </section>
        </div>
        <div className="flex h-full max-w-[33%] w-full justify-center items-center bg-white animate-pulse">
        <div className="PHONE-WRAPPER flex flex-col h-[34rem] w-[17rem] items-center p-2 border-[.9rem] bg-white border-slate-900 rounded-[2.5rem]"></div>
        </div>
      </div>)
}

export default DashboardSkeleton