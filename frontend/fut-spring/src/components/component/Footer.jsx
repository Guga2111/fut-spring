export default function Footer() {
  const currDate = new Date().getFullYear();

  return (
    <footer className="w-full py-4 mt-auto border-t">
      <div className="container mx-auto text-center">
        <p>© {currDate} Futspring, All rights reserved.</p>
      </div>
    </footer>
  );
}
