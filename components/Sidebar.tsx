import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="leftside content-between border-r-2 w-[20%] self-stretch">
      <div className="flex items-center justify-center p-4 border-b-2">
        <Link href="/">Dashbord</Link>
      </div>
      <div className="flex items-center justify-center p-4 border-b-2">
        <Link href="/Categories">Categories</Link>
      </div>
      <div className="flex items-center justify-center p-4 border-b-2">
        <Link href="/Products">Products</Link>
      </div>
    </div>
  );
}
