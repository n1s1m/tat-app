export default function BonusPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="card">
        <h1 className="card-title">Bonus</h1>
        <p className="card-text py-1">
          Haha, got you! Bonus task has been implemented as a part of the third task.
        </p>

        <p className="card-text py-1">
          But here is a funny image for you:
        </p>

        <img src="https://i.redd.it/hwqj7yx9vm211.jpg" alt="Bonus" className="max-w-100 max-h-100 py-2" />
      </div>
    </div>
  );
}
