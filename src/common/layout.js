import Nav from "@/common/nav"

export default function Layout({ children }) {
  return (
    <div className="flex LGTFullBox">
      <Nav />
      <main className="ml-22 md:ml-22 flex-1 LFTFInbox">{children}</main>
    </div>
  );
}