import Nav from "@/common/nav"

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Nav />
      <main className="ml-22 md:ml-22 flex-1">{children}</main>
    </div>
  );
}