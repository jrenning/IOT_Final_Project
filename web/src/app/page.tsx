import CountChart from "~/components/CountChart";
import TypeSummary from "~/components/TypeSummary";

export default function HomePage() {

  

  return (
    <main className="ml-4 mt-10 flex flex-col">
      <div className="mb-8 text-xl font-semibold">My Dashboard</div>
      <div className="mt-4 grid grid-cols-2">
        <TypeSummary />
        <div className=" row-span-2">
          <CountChart />
        </div>
        <div className="h-40"></div>
      </div>
    </main>
  );
}
