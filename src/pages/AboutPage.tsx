export default function AboutPage() {
  return (
    <div className="rounded bg-white p-4 shadow dark:bg-gray-800">
      <h1 className="mb-3 text-2xl font-bold">About GameVault</h1>
      <p className="mb-2">
        GameVault is a personal video game tracker built for CSCI 39548
        Assignment 4. Track games you want to play, are playing, finished, or
        dropped — with notes and 1–5 star ratings.
      </p>
      <p>
        Built with React Router (pages + URL search state), TanStack Query
        (server data), Zustand (theme + density with persistence), Tailwind
        CSS, and json-server as the backend.
      </p>
    </div>
  );
}
