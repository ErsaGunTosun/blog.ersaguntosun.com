import "@/styles/reset.css";
import "@/styles/main.css";


export const metadata = {
  title: "blog.ersaguntosun.com",
  description: "ersagun tosun blog website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
