import Nav from "@/common/nav"

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Nav />
      <main className="ml-16 md:ml-16 flex-1 p-6">{children}</main>
    </div>
  );
}