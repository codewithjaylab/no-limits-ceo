import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "No Limits Company | Transformamos Ideas en Resultados",
  description:
    "Somos una consultora de innovación y tecnología. Ayudamos a empresas a escalar con estrategia, data y producto digital.",
  openGraph: {
    title: "No Limits Company",
    description: "Transformamos Ideas en Resultados",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
