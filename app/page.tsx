import Link from "next/link";
import { Link as LinkIcon}  from "lucide-react";

export default function Home() {
  return (
    <div className="container min-h-screen mx-auto flex items-center justify-center flex-col gap-4">
      <h1 className="text-xl font-bold">Greetings, dear PM!</h1>
      <p>Here’s a carefully crafted and (hopefully) impressively executed set of test tasks. I truly enjoyed working on them and hope you’ll enjoy reviewing them just as much!</p>
      <div className="flex items-center justify-center gap-4 flex-row">
        <Link href="/first" className="btn-link">
          <span className="font-bold text-lg">
            First task
          </span>
          <LinkIcon className="w-4 h-4 pl-4" />
        </Link>
        <Link href="/second" className="btn-link">
          <span className="font-bold text-lg">
            Second task
          </span>
          <LinkIcon className="w-4 h-4 pl-4" />
        </Link>
        <Link href="/third" className="btn-link">
          <span className="font-bold text-lg">
            Third task
          </span>
          <LinkIcon className="w-4 h-4 pl-4" />
        </Link>
        <Link href="/bonus" className="btn-link ">
          <span className="font-bold text-lg">
            Bonus
          </span>
          <LinkIcon className="w-4 h-4 pl-4" />
        </Link>
      </div>
    </div>
);
}
