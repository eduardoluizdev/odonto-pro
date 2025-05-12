export function Footer() {
  return (
    <footer className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">
          Todos os direitos reservados &copy; {new Date().getFullYear()} -{" "}
          <span className="hover:text-black duration-300">
            @_porciunculaedu
          </span>
        </p>
      </div>
    </footer>
  );
}
