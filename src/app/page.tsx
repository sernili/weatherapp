import WeeklyView from "@/components/weekly-view/WeeklyView";

// TODO: add different views for different cities
export default function Home() {
  return (
    <main className="bg-gradient-radial from-gray-800 to-black h-screen w-screen flex justify-center">
      <WeeklyView />
    </main>
  );
}
